import { getProductWishCount } from "@/actions/wishlists/wishlist";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    try {
        // Extract productId from query parameters
        const { searchParams } = new URL(request.url);
        const productId = searchParams.get("productId");

        if (!productId) {
            return NextResponse.json(
                { success: false, message: "Product ID is required." },
                { status: 400 }
            );
        }

        // Fetch product wish count
        const response = await getProductWishCount(productId);

        return NextResponse.json(response, { status: response.success ? 200 : 404 });
    } catch (error: unknown) {
        console.error("Error in GET /wishlist/product-wishcount:", error);
        return NextResponse.json(
            { success: false, message: "Internal server error." },
            { status: 500 }
        );
    }
}