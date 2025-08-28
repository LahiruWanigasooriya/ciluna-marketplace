import {
  addReview,
  getProductReviews,
  getProductReviewSummary,
} from "@/actions/reviews/action";


import { NextRequest, NextResponse } from "next/server";

// **GET: Fetch Reviews for a Specific Product or Variant**
export async function GET(request: NextRequest) {
  try {
    // Extract productId and productVariantId from query parameters
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get("productId");
    const productVariantId = searchParams.get("productVariantId");
    const summary = searchParams.get("summary"); // Optional: Fetch summary if 'summary=true'

    if (!productId) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    // If 'summary=true', fetch review summary
    if (summary === "true") {
      const response = await getProductReviewSummary(productId, productVariantId || undefined);
      return NextResponse.json(response, { status: response.status });
    }

    // Otherwise, fetch product or variant reviews
    const response = await getProductReviews(productId, productVariantId || undefined);

    return NextResponse.json(response, { status: response.status });
  } catch (error: unknown) {
    console.error("Error in GET /reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}

// **POST: Add a New Review**
export async function POST(request: NextRequest) {
  try {
    // Extract token from Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token is required." },
        { status: 403 }
      );
    }

    // Parse request body for review data
    const {
      productId,
      productVariantId,
      rating,
      // title,
      content,
    }: {
      productId: string;
      productVariantId?: string;
      rating: number;
      // title: string;
      content: string;
    } = await request.json();

    if (!productId || !rating || !content) {
      return NextResponse.json(
        {
          success: false,
          message:
            "All fields (productId, rating, title, content) are required.",
        },
        { status: 400 }
      );
    }

    // Add new review
    const response = await addReview({
      productId,
      productVariantId,
      rating,
      // title,
      content,
      token,
    });

    return NextResponse.json(response, { status: response.status });
  } catch (error: unknown) {
    console.error("Error in POST /reviews:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
