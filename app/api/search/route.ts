import { NextRequest, NextResponse } from "next/server";
import { dbConnectMarketPlace } from "@/lib/dbConnect";
import CategoryModel from "@/backend/models/category";
import ProductModel from "@/backend/models/product";
import { SearchResults } from "@/types/search";
import SubcategoryModel from "@/backend/models/subcategory";
import SubSubCategoryModel from "@/backend/models/subsubcategory";

export async function GET(request: NextRequest): Promise<NextResponse> {
  const searchTerm = request.nextUrl.searchParams.get("query")?.toLowerCase() || "";

  try {
    await dbConnectMarketPlace();

    const filteredProducts = await ProductModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .populate("category", "name")
      .limit(10)
      .lean();

    const filteredCategories = await CategoryModel.find({
      name: { $regex: searchTerm, $options: "i" },
      isActive: true,
    })
      .limit(10)
      .lean();

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

    const results: SearchResults = {
      products: filteredProducts as any[],
      subCategories: filteredSubCategories as any[],
      subsubCategories: filteredSubSubCategories as any[],
      categories: filteredCategories as any[],
    };

    return NextResponse.json(results, { status: 200 });
  } catch (error) {
    console.error("Search error:", error);
    const errorResponse: SearchResults = {
      products: [],
      subCategories: [],
      subsubCategories: [],
      categories: [],
      error: "An error occurred while searching",
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}