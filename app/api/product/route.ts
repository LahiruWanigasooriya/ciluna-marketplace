import { createProduct, deleteProduct, getAllProducts, getProductById } from "@/backend/actions/products/product";
import { getSession } from "@/lib/session";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!body || (Array.isArray(body) && body.length === 0)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Request body cannot be empty",
				}),
				{
					status: 400,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				}
			);
		}

		// Check if the request is for bulk product creation
		const isBulkCreate = Array.isArray(body);

		// Process the request
		const addData = await createProduct(body);

		return new Response(JSON.stringify(addData), {
			status: addData.status || (isBulkCreate ? 206 : 201), // 206 for partial success, 201 for success
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	} catch (error: unknown) {
		return new Response(
			JSON.stringify({
				success: false,
				message: error instanceof Error ? error.message : "Internal server error",
			}),
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			}
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const productId = searchParams.get("productId");
		const subcategoryId = searchParams.get("subcategoryId");
		const subsubcategoryId = searchParams.get("subsubcategoryId");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = (searchParams.get("sortOrder") as "desc" | "asc") || "desc";

		// If productId is provided → fetch single product
		if (productId) {
			const productData = await getProductById(productId);

			if (!productData || productData.status === 404) {
				return new Response(JSON.stringify({ success: false, message: "Product not found" }), {
					status: 404,
					headers: { "Content-Type": "application/json" },
				});
			}

			return new Response(JSON.stringify(productData), { status: 200 });
		}

		// If subsubcategoryId is provided → filter products
		if (subsubcategoryId) {
			const getData = await getAllProducts({
				page,
				limit,
				search,
				sortBy,
				sortOrder,
				subsubcategoryId, // ✅ filter by subsubcategory
			});

			return new Response(JSON.stringify(getData), { status: 200 });
		}

		// If subcategoryId is provided → filter products
		if (subcategoryId) {
			const getData = await getAllProducts({
				page,
				limit,
				search,
				sortBy,
				sortOrder,
				subcategoryId, // ✅ filter by subcategory
			});

			return new Response(JSON.stringify(getData), { status: 200 });
		}

		// Otherwise → fetch all products
		const getData = await getAllProducts({
			page,
			limit,
			search,
			sortBy,
			sortOrder,
		});

		return new Response(JSON.stringify(getData), { status: 200 });
	} catch (error: unknown) {
		return new Response(
			JSON.stringify({
				success: false,
				message: error instanceof Error ? error.message : "Internal server error",
			}),
			{ status: 500 }
		);
	}
}

export async function DELETE(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const productId = searchParams.get("productId");

		if (!productId) {
			console.log("DELETE /api/product: Missing productId");
			return NextResponse.json({ success: false, message: "Product ID is required" }, { status: 400 });
		}

		// Check session
		const session = await getSession();
		console.log("DELETE /api/product: Session:", session);

		if (!session || !["admin", "superadmin"].includes(session.role)) {
			console.log("DELETE /api/product: Unauthorized, session:", session);
			return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
		}

		const result = await deleteProduct(productId);
		console.log("DELETE /api/product: Result:", result);

		return NextResponse.json(
			{
				success: result.success,
				message: result.message,
				error: result.error,
			},
			{ status: result.status }
		);
	} catch (error: any) {
		console.error("DELETE /api/product: Error:", error.message, error.stack);
		return NextResponse.json(
			{ success: false, message: "Internal server error", error: error.message },
			{ status: 500 }
		);
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
				"Access-Control-Allow-Headers": "Content-Type, Authorization, Cookie", // Allowed headers
			},
		}
	);
}
