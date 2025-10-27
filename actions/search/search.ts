"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import CategoryModel from "@/models/category";
import ProductModel from "@/models/product";
import SubcategoryModel from "@/models/subcategory";
import SubSubCategoryModel from "@/models/subsubcategory";
import { SearchResults } from "@/types/search";

export async function searchItems(formData: FormData): Promise<SearchResults> {
  const searchTerm = formData.get("query")?.toString().toLowerCase() || "";

  try {
    await dbConnectMarketPlace();
    // Search products by name (case-insensitive)
    const filteredProducts = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .populate("category", "name")
      .limit(10)
      .lean();

    // Search categories by name (case-insensitive)
    const filteredCategories = await CategoryModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .limit(10)
      .lean();

    // Search subcategories by name (case-insensitive)
    const filteredSubCategories = await SubcategoryModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .limit(10)
      .lean();
    const filteredSubSubCategories = await SubSubCategoryModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .limit(10)
      .lean();

    // Return combined results
    return {
      products: JSON.parse(JSON.stringify(filteredProducts)),
      categories: JSON.parse(JSON.stringify(filteredCategories)),
      subCategories: JSON.parse(JSON.stringify(filteredSubCategories)),
      subsubCategories: JSON.parse(JSON.stringify(filteredSubSubCategories)),
    };
  } catch (error) {
    console.error("Search error in Server Action:", error);
    return {
      products: [],
      categories: [],
      subCategories: [],
      subsubCategories: [],
      error: "An error occurred while searching",
    };
  }
}