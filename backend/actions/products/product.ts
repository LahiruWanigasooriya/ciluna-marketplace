"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import { CreateProductParams, GetProductsParams, IProduct } from "@/types/product";
import "../../models/category";
import "../../models/brand";
import "../../models/model";
import "../../models/user";
import "../../models/subcategory";
import "../../models//productVariantCategory";
import "../../models/productVariantSubCategory";
import "../../models/subsubcategory";
import ProductModel from "../../models/product";
import ProductVariantModel from "../../models/productVariant";
import { logAction } from "@/lib/logger";
import OrderModel from "@/backend/models/order";

interface GetProductsResponse {
	status: number;
	success: boolean;
	message: string;
	data?: {
		products: IProduct[];
		total: number;
		totalPages: number;
		currentPage: number;
	};
	error?: string;
}

export const getAllProducts = async (queryOptions: Partial<GetProductsParams> = {}): Promise<GetProductsResponse> => {
	try {
		await dbConnectMarketPlace();

		const {
			page = 1,
			limit = 15,
			search = "",
			sortBy = "createdAt",
			sortOrder = "desc",
			subcategoryId,
			subsubcategoryId,
		} = queryOptions;

		const query: any = { isActive: true };

		// ✅ Add filters
		if (subcategoryId) {
			query.subcategory = subcategoryId;
		}

		if (subsubcategoryId) {
			query.subsubcategory = subsubcategoryId;
		}

		if (search) {
			query.$or = [{ name: { $regex: search, $options: "i" } }, { description: { $regex: search, $options: "i" } }];
		}

		const sortOptions: Record<string, any> = {};
		if (sortBy) {
			sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
		}

		const skip = (page - 1) * limit;

		const products = await ProductModel.find(query)
			.sort(sortOptions)
			.skip(skip)
			.limit(limit)
			.populate("category", "name")
			.populate("subcategory", "name")
			.populate("subsubcategory", "name") // ✅ add this
			.populate("brand", "name")
			.populate("model", "name")
			.populate("createdBy", "name")
			.populate("productVariantCategories", "name")
			.lean();

		const total = await ProductModel.countDocuments(query);

		return {
			status: 200,
			success: true,
			message: "Products fetched successfully",
			data: {
				products: JSON.parse(JSON.stringify(products)),
				total,
				totalPages: Math.ceil(total / limit),
				currentPage: page,
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching products",
			error: error.message,
		};
	}
};

export const createProduct = async (productData: CreateProductParams | CreateProductParams[]) => {
	try {
		await dbConnectMarketPlace();

		// Check if `productData` is an array (bulk create)
		const isBulkCreate = Array.isArray(productData);

		if (isBulkCreate) {
			// Validate and create multiple products
			const products = productData as CreateProductParams[];
			const errors = [];
			const createdProducts = [];

			for (const product of products) {
				const {
					name,
					price,
					stock,
					image,
					category,
					createdBy,
					productVariantCategories,
					regionCode,
					storageCapacity,
					condition,
					features,
					color,
					colorCode,
					size,
				} = product;

				// Validate required fields
				if (!name || !price || !stock || !image || !category || !createdBy) {
					errors.push({ product, message: "Missing required fields" });
					continue;
				}

				// Check for existing product
				const existingProduct = await ProductModel.findOne({ name: name.trim() });
				if (existingProduct) {
					errors.push({ product, message: `Product with name "${name}" already exists` });
					continue;
				}

				// Create and save the product
				const newProduct = new ProductModel({
					...product,
					productVariantCategories: productVariantCategories || [],
					regionCode: regionCode || null,
					storageCapacity: storageCapacity || null,
					condition: condition || "new",
					features: features || [],
					color: color || null,
					colorCode: colorCode || null,
					size: size || null,
				});

				const savedProduct = await newProduct.save();
				createdProducts.push(savedProduct);

				// Log the create action
				await logAction("create_product", {
					productId: savedProduct._id.toString(),
					name: savedProduct.name || "Unknown",
					createdBy: savedProduct.createdBy.toString(),
				});
			}

			return {
				status: errors.length === 0 ? 201 : 206,
				success: errors.length === 0,
				message: errors.length === 0 ? "All products created successfully" : "Some products failed to create",
				data: {
					createdProducts: JSON.parse(JSON.stringify(createdProducts)),
					errors,
				},
			};
		} else {
			// Single product creation
			const {
				name,
				price,
				stock,
				image,
				category,
				createdBy,
				productVariantCategories,
				regionCode,
				storageCapacity,
				condition,
				features,
				color,
				colorCode,
				size,
			} = productData as CreateProductParams;

			// Validate required fields
			if (!name || !price || !stock || !image || !category || !createdBy) {
				return {
					status: 400,
					success: false,
					message: "Missing required fields",
				};
			}

			// Check for existing product
			const existingProduct = await ProductModel.findOne({ name: name.trim() });
			if (existingProduct) {
				return {
					status: 400,
					success: false,
					message: "A product with the same name already exists",
				};
			}

			// Create and save the product
			const newProduct = new ProductModel({
				...productData,
				productVariantCategories: productVariantCategories || [],
				regionCode: regionCode || null,
				storageCapacity: storageCapacity || null,
				condition: condition || "new",
				features: features || [],
				color: color || null,
				colorCode: colorCode || null,
				size: size || null,
			});

			const savedProduct = await newProduct.save();

			// Log the create action
			await logAction("create_product", {
				productId: savedProduct._id.toString(),
				name: savedProduct.name || "Unknown",
				createdBy: savedProduct.createdBy.toString(),
			});

			return {
				status: 201,
				success: true,
				message: "Product created successfully",
				data: JSON.parse(JSON.stringify(savedProduct)),
			};
		}
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while creating the product(s)",
			error: error.message,
		};
	}
};

export const getRelatedProducts = async (productID: string, limit: number = 10) => {
	try {
		await dbConnectMarketPlace();

		// Validate productID
		if (!productID) {
			return {
				status: 400,
				success: false,
				message: "Invalid product ID",
			};
		}

		// Fetch the product
		const product = await ProductModel.findById(productID)
			.populate("category", "name")
			.populate("subcategory", "name")
			.populate("brand", "name")
			.populate("model", "name")
			.populate("productVariantCategories", "name")
			.populate("createdBy", "name");

		if (!product) {
			return {
				status: 404,
				success: false,
				message: "Product not found",
			};
		}

		// Build query for related items
		const query: any = {
			isActive: true,
			_id: { $ne: productID },
			$or: [
				// { category: product.category?._id },
				// { subcategory: product.subcategory?._id },
				{ brand: product.brand?._id },
				// { model: product.model?._id },
				// { productVariantCategories: { $in: product.productVariantCategories } },
			],
		};

		// Fetch related products
		const relatedItems = await ProductModel.find(query)
			.limit(limit)
			.sort({ createdAt: -1 })
			.populate("category", "name")
			.populate("subcategory", "name")
			.populate("brand", "name")
			.populate("model", "name")
			.populate("productVariantCategories", "name")
			.populate("createdBy", "name");

		return {
			status: 200,
			success: true,
			message: "Related products fetched successfully",
			data: {
				relatedItems: JSON.parse(JSON.stringify(relatedItems)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching related products",
			error: error.message,
		};
	}
};

//get trending products based on orders from last 30 days, most ordered products
export const getTrendingProducts = async (limit: number = 8) => {
	try {
		await dbConnectMarketPlace();
		const thirtyDaysAgo = new Date();
		thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

		// Aggregate to find trending products by total quantity in the last 30 days
		const trendingProducts = await OrderModel.aggregate([
			{ $match: { createdAt: { $gte: thirtyDaysAgo } } },
			{ $unwind: "$items" },
			{
				$group: {
					_id: "$items.productId",
					totalQuantity: { $sum: "$items.quantity" },
				},
			},
			{ $sort: { totalQuantity: -1 } },
			{ $limit: limit },
			{
				$lookup: {
					from: "products",
					localField: "_id",
					foreignField: "_id",
					as: "productDetails",
				},
			},
			{ $unwind: "$productDetails" }, // get the full product document
			{
				$replaceRoot: { newRoot: "$productDetails" } // Replace the root with productDetails
			},
		]);

		return {
			status: 200,
			success: true,
			message: "Trending products fetched successfully",
			data: {
				products: JSON.parse(JSON.stringify(trendingProducts)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching trending products",
			error: error.message,
		};
	}
};


export const getProductById = async (productId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!productId) {
			return {
				status: 400,
				success: false,
				message: "Product ID is required",
			};
		}

		// Find the product and populate related fields
		const product = await ProductModel.findById(productId)
			.populate("category", "name")
			.populate("subcategory", "name")
			.populate("brand", "name")
			.populate("model", "name")
			.populate("createdBy", "name")
			.populate({
				path: "productVariantCategories",
				select: "name subCategories",
				populate: {
					path: "subCategories",
					model: "ProductVariantSubCategory",
					select: "value subValue",
				},
			});

		if (!product) {
			return {
				status: 404,
				success: false,
				message: "Product not found",
			};
		}

		// Fetch variants
		// const variants = await ProductVariantModel.find({ productId })
		//   .populate("subCategoryIds", "value")
		//   .select("_id price stock images discount subCategoryIds")
		//   .lean();

		const variants = await ProductVariantModel.find({ productId })
			.populate({
				path: "subCategoryIds",
				select: "value subValue _id",
				model: "ProductVariantSubCategory",
			})
			.select("_id price stock images discount subCategoryIds")
			.lean();

		// Transform variants to include explicit color and size fields
		const enhancedVariants = variants.map((variant) => {
			const transformedVariant = { ...variant };

			// Extract color and size from subCategoryIds
			variant.subCategoryIds.forEach((subCategory: any) => {
				// Find which category this subCategory belongs to
				const parentCategory = product.productVariantCategories.find((cat: any) =>
					cat.subCategories.some((sub: any) => sub._id.toString() === subCategory._id.toString())
				);

				if (parentCategory) {
					if (parentCategory.name === "Color") {
						transformedVariant.color = subCategory.value;
						transformedVariant.colorCode = subCategory.subValue;
					} else if (parentCategory.name === "Size") {
						transformedVariant.size = subCategory.value;
					}
					// Add more categories here in the future as needed
				}
			});

			return transformedVariant;
		});

		const availableCombinations = enhancedVariants.map((variant) => ({
			color: variant.color,
			size: variant.size,
		}));

		return {
			status: 200,
			success: true,
			message: "Product fetched successfully",
			data: {
				product: JSON.parse(JSON.stringify(product)),
				variants: JSON.parse(JSON.stringify(variants)),
				availableCombinations: JSON.parse(JSON.stringify(availableCombinations)),
			},
		};
	} catch (error: any) {
		return {
			status: 500,
			success: false,
			message: "An error occurred while fetching the product",
			error: error.message,
		};
	}
};

export const deleteProduct = async (productId: string) => {
	try {
		await dbConnectMarketPlace();

		if (!productId) {
			return {
				status: 400,
				success: false,
				message: "Product ID is required",
			};
		}

		// Check if product exists
		const product = await ProductModel.findById(productId);
		if (!product) {
			return {
				status: 404,
				success: false,
				message: "Product not found",
			};
		}

		// Delete the product
		await ProductModel.findByIdAndDelete(productId);

		// Delete associated variants
		await ProductVariantModel.deleteMany({ productId });

		// Log the delete action
		await logAction("delete_product", {
			productId,
			name: product.name || "Unknown",
		});

		return {
			status: 200,
			success: true,
			message: "Product and its variants deleted successfully",
		};
	} catch (error: any) {
		console.error("Error in deleteProduct:", error);
		return {
			status: 500,
			success: false,
			message: "An error occurred while deleting the product",
			error: error.message,
		};
	}
};

// Sample updateProduct action (add if needed)
export const updateProduct = async (productId: string, productData: Partial<CreateProductParams>) => {
	try {
		await dbConnectMarketPlace();

		if (!productId) {
			return {
				status: 400,
				success: false,
				message: "Product ID is required",
			};
		}

		// Check if product exists
		const product = await ProductModel.findById(productId);
		if (!product) {
			return {
				status: 404,
				success: false,
				message: "Product not found",
			};
		}

		// Validate and update fields
		const updates: Record<string, any> = {};
		if (productData.name) updates.name = productData.name;
		if (productData.description !== undefined) updates.description = productData.description;
		if (productData.price !== undefined) updates.price = productData.price;
		if (productData.stock !== undefined) updates.stock = productData.stock;
		if (productData.image) updates.image = productData.image;
		if (productData.category) updates.category = productData.category;
		if (productData.subcategory) updates.subcategory = productData.subcategory;
		if (productData.brand) updates.brand = productData.brand;
		if (productData.model) updates.model = productData.model;
		if (productData.productVariantCategories) updates.productVariantCategories = productData.productVariantCategories;
		if (productData.regionCode !== undefined) updates.regionCode = productData.regionCode;
		if (productData.storageCapacity !== undefined) updates.storageCapacity = productData.storageCapacity;
		if (productData.condition) updates.condition = productData.condition;
		if (productData.features) updates.features = productData.features;
		if (productData.color) updates.color = productData.color;
		if (productData.colorCode) updates.colorCode = productData.colorCode;
		if (productData.size) updates.size = productData.size;

		// Check for duplicate name
		if (updates.name && updates.name !== product.name) {
			const existingProduct = await ProductModel.findOne({ name: updates.name.trim() });
			if (existingProduct) {
				return {
					status: 400,
					success: false,
					message: `Product with name "${updates.name}" already exists`,
				};
			}
		}

		// Update the product
		const updatedProduct = await ProductModel.findByIdAndUpdate(productId, { $set: updates }, { new: true });

		// Log the update action
		await logAction("update_product", {
			productId,
			name: updatedProduct.name || "Unknown",
			changes: updates,
		});

		return {
			status: 200,
			success: true,
			message: "Product updated successfully",
			data: JSON.parse(JSON.stringify(updatedProduct)),
		};
	} catch (error: any) {
		console.error("Error in updateProduct:", error);
		return {
			status: 500,
			success: false,
			message: "An error occurred while updating the product",
			error: error.message,
		};
	}
};
