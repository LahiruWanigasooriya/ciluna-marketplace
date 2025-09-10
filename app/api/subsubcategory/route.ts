import {
  createSubSubCategory,
  deleteSubSubCategory,
  getAllSubSubCategories,
  getSubSubCategoryById,
  updateSubSubCategory,
} from "@/actions/subsubcategories/subsubcategory";
import { NextResponse } from "next/server";

// Helper function to create consistent error response
const createErrorResponse = (message: string, status: number) => {
  return new Response(
    JSON.stringify({ success: false, message }),
    {
      status,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    }
  );
};

// Helper function to create consistent success response
const createSuccessResponse = (data: any, status: number = 200) => {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
};

export async function GET(request: Request) {
  try {
    console.log("GET /api/subsubcategory - Request started");
    
    const { searchParams } = new URL(request.url);

    // Extract and validate query parameters
    const subsubcategoryId = searchParams.get("subsubcategoryId"); // Fixed parameter name
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") as "desc" | "asc" | undefined;

    console.log("GET /api/subsubcategory - Parameters:", { subsubcategoryId, page, limit, search, sortBy, sortOrder });

    if (subsubcategoryId) {
      console.log("GET /api/subsubcategory - Fetching by ID:", subsubcategoryId);
      const subSubCategoryData = await getSubSubCategoryById(subsubcategoryId);

      if (!subSubCategoryData || subSubCategoryData.status === 404) {
        console.log("GET /api/subsubcategory - Not found:", subsubcategoryId);
        return createErrorResponse("Subsubcategory not found", 404);
      }

      console.log("GET /api/subsubcategory - Found by ID:", subsubcategoryId);
      return createSuccessResponse(subSubCategoryData);
    }

    // Validate sortOrder to ensure it's either "desc" or "asc"
    const validSortOrder: "desc" | "asc" | undefined =
      sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined;

    console.log("GET /api/subsubcategory - Fetching all with params:", { page, limit, search, sortBy, sortOrder: validSortOrder });
    
    const subSubCategoryData = await getAllSubSubCategories({
      page,
      limit,
      search,
      sortBy,
      sortOrder: validSortOrder,
    });

    console.log("GET /api/subsubcategory - Success:", subSubCategoryData.success);
    return createSuccessResponse(subSubCategoryData);
  } catch (error: unknown) {
    console.error("GET /api/subsubcategory - Error:", error);
    
    // Default error message
    let errorMessage = "Internal server error";

    // Safely access the error message if available
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return createErrorResponse(errorMessage, 500);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.name || !body.subcategoryId) {
      return createErrorResponse("Missing required fields: name or subcategoryId", 400);
    }

    const subSubCategoryData = await createSubSubCategory(body);

    return createSuccessResponse(subSubCategoryData, subSubCategoryData.status || 200);
  } catch (error: unknown) {
    // Default error message if the error does not have a message property
    let errorMessage = "Internal server error";

    // Check if error is an instance of Error to safely access the message
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return createErrorResponse(errorMessage, 500);
  }
}

export async function PUT(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subsubcategoryId = searchParams.get("subsubcategoryId");
    const body = await request.json();

    // Validate subsubcategoryId parameter
    if (!subsubcategoryId) {
      return createErrorResponse("Subsubcategory ID is required", 400);
    }

    // Validate required fields
    if (!body.name || !body.subcategoryId) {
      return createErrorResponse("Missing required fields: name or subcategoryId", 400);
    }

    const result = await updateSubSubCategory(subsubcategoryId, body);
    return createSuccessResponse({ result, success: result.status }, result.status || 200);
  } catch (error: unknown) {
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return createErrorResponse(errorMessage, 500);
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const subsubcategoryId = searchParams.get("subsubcategoryId");

    if (!subsubcategoryId) {
      return createErrorResponse("Subsubcategory ID is required", 400);
    }

    const response = await deleteSubSubCategory(subsubcategoryId);
    return createSuccessResponse(response, response.status || 200);
  } catch (error: unknown) {
    let errorMessage = "Internal server error";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return createErrorResponse(errorMessage, 500);
  }
}

export async function OPTIONS(request: Request) {
  return new Response(
    null, // No body content required for OPTIONS request
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*", // Allow all origins
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS", // Methods allowed
        "Access-Control-Allow-Headers": "Content-Type, Authorization", // Allowed headers
      },
    }
  );
}