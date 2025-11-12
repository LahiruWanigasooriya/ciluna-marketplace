import { addToCart, clearCart, getCart, removeCartItem, updateCartItem } from "@/backend/actions/carts/cart";
import { AddToCartParams, UpdateCartItemParams, RemoveCartItemParams } from "@/types/cart";
import { NextRequest, NextResponse } from "next/server";

// Add new item to cart
export async function POST(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		const body = await request.json();
		if (!body || !body.productId || !body.quantity) {
			return NextResponse.json(
				{ success: false, message: "Missing required fields in request body." },
				{ status: 400 }
			);
		}

		const cartItem: AddToCartParams = {
			productId: body.productId,
			productVariantId: body.productVariantId || null,
			quantity: body.quantity,
		};

		const response = await addToCart(cartItem, token);

		return NextResponse.json(response, {
			status: response.success ? 200 : 400,
		});
	} catch (error: unknown) {
		console.error("Error in POST /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

// Get cart
export async function GET(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		const response = await getCart(token);

		return NextResponse.json(response, {
			status: response.success ? 200 : 404,
		});
	} catch (error: unknown) {
		console.error("Error in GET /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

// Update cart item
export async function PUT(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		const body = await request.json();
		if (!body.itemId) {
			return NextResponse.json({ success: false, message: "Item ID is required." }, { status: 400 });
		}

		const updateParams: UpdateCartItemParams = {
			itemId: body.itemId,
			quantity: body.quantity,
			productVariantId: body.productVariantId || null,
		};

		const response = await updateCartItem(updateParams, token);

		return NextResponse.json(response, {
			status: response.success ? 200 : 400,
		});
	} catch (error: unknown) {
		console.error("Error in PUT /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

// Remove cart item
export async function DELETE(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		const { searchParams } = new URL(request.url);
		const itemId = searchParams.get("itemId");

		if (!itemId) {
			return NextResponse.json({ success: false, message: "Item ID is required." }, { status: 400 });
		}

		const removeParams: RemoveCartItemParams = {
			itemId,
		};

		const response = await removeCartItem(removeParams, token);

		return NextResponse.json(response, {
			status: response.success ? 200 : 400,
		});
	} catch (error: unknown) {
		console.error("Error in DELETE /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

// Clear cart
export async function PATCH(request: NextRequest) {
	try {
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		const response = await clearCart(token);

		return NextResponse.json(response, {
			status: response.success ? 200 : 400,
		});
	} catch (error: unknown) {
		console.error("Error in PATCH /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}
