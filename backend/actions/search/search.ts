"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import CategoryModel from "../../models/category";
import ProductModel from "../../models/product";
import SubcategoryModel from "../../models/subcategory";
import SubSubCategoryModel from "../../models/subsubcategory";
import { SearchResults } from "@/types/search";
import SearchQueryModel from "@/backend/models/searchQuery";
import mongoose from "mongoose";

const escapeRegex = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // escape regex special characters

const getWordVariants = (word: string): string[] => {
	const variants = new Set<string>();
	const w = word.toLowerCase();
	variants.add(w);
	if (w.length > 4 && w.endsWith("ies")) variants.add(w.slice(0, -3) + "y");
	if (w.length > 3 && w.endsWith("es")) variants.add(w.slice(0, -2));
	if (w.length > 3 && w.endsWith("s")) variants.add(w.slice(0, -1));
	return Array.from(variants);
};

const buildVariantsPattern = (word: string): string => {
	const variants = getWordVariants(word);
	return variants.length === 1 ? escapeRegex(variants[0]) : variants.map(escapeRegex).join("|");
};

const createWordBoundaryRegex = (word: string): RegExp => {
	const pattern = buildVariantsPattern(word);
	return new RegExp(`\\b(${pattern})\\b`, "i");
};

export async function searchItems(formData: FormData): Promise<SearchResults> {
	const searchTerm = (formData.get("query")?.toString() || "").toLowerCase().trim();

	if (!searchTerm) return { products: [], categories: [], subCategories: [], subsubCategories: [] };

	try {
		await dbConnectMarketPlace();
		const searchWords = searchTerm.split(/\s+/).filter((w) => w.length > 1);

		const fullTermRegex = new RegExp(`\\b${escapeRegex(searchTerm)}\\b`, "i");
		const startsWithRegex = new RegExp(`^${escapeRegex(searchTerm)}`, "i");

		// Get matching categories, subcategories, and subsubcategories
		const [categories, subCategories, subSubCategories] = await Promise.all([
			CategoryModel.find({ name: { $regex: `\\b${escapeRegex(searchTerm)}`, $options: "i" }, isActive: true })
				.limit(10)
				.lean(),
			SubcategoryModel.find({ name: { $regex: `\\b${escapeRegex(searchTerm)}`, $options: "i" }, isActive: true })
				.limit(10)
				.lean(),
			SubSubCategoryModel.find({ name: { $regex: `\\b${escapeRegex(searchTerm)}`, $options: "i" }, isActive: true })
				.limit(10)
				.lean(),
		]);

		const categoryIds = categories.map((c) => c._id);
		const subcategoryIds = subCategories.map((s) => s._id);
		const subsubcategoryIds = subSubCategories.map((s) => s._id);

		// Query products using MongoDB text search or fallback to regex if empty
		let productsFromText = await ProductModel.find(
			{ isActive: true, $text: { $search: searchTerm } },
			{ score: { $meta: "textScore" } }
		)
			.sort({ score: { $meta: "textScore" } })
			.populate("category subcategory subsubcategory", "name")
			.limit(120)
			.lean();

		if (!productsFromText.length) {
			const productNameConditions =
				searchWords.length > 1
					? [{ $and: searchWords.map((word) => ({ name: { $regex: buildVariantsPattern(word), $options: "i" } })) }]
					: [{ name: { $regex: buildVariantsPattern(searchTerm), $options: "i" } }];

			productsFromText = await ProductModel.find({ $or: productNameConditions, isActive: true })
				.populate("category subcategory subsubcategory", "name")
				.limit(120)
				.lean();
		}

		// Query for products belonging to the matched categories, subcategories, and subsubcategories
		const categoryProducts =
			categoryIds.length || subcategoryIds.length || subsubcategoryIds.length
				? await ProductModel.find({
						isActive: true,
						$or: [
							{ category: { $in: categoryIds } },
							{ subcategory: { $in: subcategoryIds } },
							{ subsubcategory: { $in: subsubcategoryIds } },
						],
				  })
						.populate("category subcategory subsubcategory", "name")
						.limit(80)
						.lean()
				: [];

		const allCandidates = [...productsFromText, ...categoryProducts]; // Merge both product results

		// Calculate score for each product based on its name and category matches
		const scoredProducts = allCandidates.map((product) => {
			let score = 0;
			const productName = (product.name || "").toLowerCase();
			const categoryName = (product.category?.name || "").toLowerCase();
			const subcategoryName = (product.subcategory?.name || "").toLowerCase();
			const subsubcategoryName = (product.subsubcategory?.name || "").toLowerCase();

			// Base score from MongoDB textScore
			const textScore = (product as any).score ?? 0;
			score += textScore * 50;

			// Score based on full name, starts with, or word boundary matches
			if (productName === searchTerm) score += 800;
			if (startsWithRegex.test(productName)) score += 500;
			if (fullTermRegex.test(productName)) score += 350;

			// Score based on matching word variants in the product name and hierarchy (category, subcategory, etc.)
			searchWords.forEach((word) => {
				const re = createWordBoundaryRegex(word);
				if (re.test(productName)) score += 120;
				if (re.test(subsubcategoryName)) score += 70;
				if (re.test(subcategoryName)) score += 50;
				if (re.test(categoryName)) score += 40;
			});

			// Penalize longer product names if they contain more words than the search term
			const productWordCount = productName.split(/\s+/).length;
			if (productWordCount > searchWords.length) score -= (productWordCount - searchWords.length) * 3;

			return { product, score };
		});

		// Remove duplicate products and sort by score
		const seen = new Set<string>();
		const uniqueSorted = scoredProducts
			.sort((a, b) => b.score - a.score)
			.filter(({ product }) => {
				const id = (product._id as mongoose.Types.ObjectId).toString();
				if (seen.has(id)) return false;
				seen.add(id);
				return true;
			})
			.slice(0, 20)
			.map((item) => item.product);

		return {
			products: JSON.parse(JSON.stringify(uniqueSorted)),
			categories: JSON.parse(JSON.stringify(categories)),
			subCategories: JSON.parse(JSON.stringify(subCategories)),
			subsubCategories: JSON.parse(JSON.stringify(subSubCategories)),
		};
	} catch (error) {
		console.error("Search error:", error);
		return {
			products: [],
			categories: [],
			subCategories: [],
			subsubCategories: [],
			error: "An error occurred while searching",
		};
	}
}

export async function addSearchQuery(formData: FormData) {
	const query = formData.get("query")?.toString() || "";
	try {
		await dbConnectMarketPlace();
		const newSearchQuery = new SearchQueryModel({
			query,
		});
		await newSearchQuery.save();
	} catch (error) {
		console.error("Error saving search query:", error);
	}
}

export async function getPopularSearchQueries(limit: number = 3, searchTerm?: string) {
	try {
		await dbConnectMarketPlace();

		const matchStage = searchTerm
			? {
					$match: {
						query: {
							$regex: searchTerm,
							$options: "i",
						},
						$expr: {
							$gt: [{ $strLenCP: "$query" }, searchTerm.length],
						},
					},
			  }
			: { $match: {} };

		const popularQueries = await SearchQueryModel.aggregate([
			matchStage,
			{
				$group: {
					_id: "$query",
					count: { $sum: 1 },
					lastSearched: { $max: "$createdAt" },
					userIds: { $addToSet: "$userId" },
				},
			},
			{ $sort: { count: -1 } },
			{ $limit: limit },
			{
				$addFields: {
					queryLength: { $strLenCP: "$_id" },
				},
			},
			{ $sort: { queryLength: 1 } },
			{
				$project: {
					query: "$_id",
				},
			},
		]);
		return JSON.parse(JSON.stringify(popularQueries));
	} catch (error) {
		console.error("Error fetching popular search queries:", error);
		return [];
	}
}
