import {
	createProductVariant,
	deleteProductVariant,
	getAllProductVariants,
	getProductVariantById,
	updateProductVariant,
	// getProductVarinatById,
} from "@/backend/actions/productVariants/productVariant";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const id = searchParams.get("id") || "";
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc";

		// Fetch product variants with optional filtering by productId

		if (id) {
			const productData = await getProductVariantById(id);

			if (!productData || productData.status === 404) {
				return new Response(JSON.stringify({ success: false, message: "product variant not found" }), {
					status: 404,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				});
			}
			return new Response(JSON.stringify(productData), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}

		const getData = await getAllProductVariants({
			page,
			limit,
			search,
			sortBy,
			sortOrder,
		});

		return new Response(JSON.stringify(getData), {
			status: 200,
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

export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!body || (Array.isArray(body) && body.length === 0)) {
			return new Response(
				JSON.stringify({
					success: false,
					message: "Request body cannot be empty",
				}),
				{ status: 400, headers: { "Content-Type": "application/json" } }
			);
		}

		// Check if the request is for bulk variant creation
		const isBulkCreate = Array.isArray(body);

		// Process the request
		const addData = await createProductVariant(body);

		return new Response(JSON.stringify(addData), {
			status: addData.status || (isBulkCreate ? 206 : 201), // 206 for partial success, 201 for success
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: unknown) {
		return new Response(
			JSON.stringify({
				success: false,
				message: error instanceof Error ? error.message : "Internal server error",
			}),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

export async function PUT(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const id = searchParams.get("id");
		const body = await request.json();
		if (id) {
			const result = await updateProductVariant(id, body);
			return new Response(JSON.stringify({ result, success: result.status }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}
	} catch (error: any) {
		return new Response(JSON.stringify({ success: false }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);

	const id = searchParams.get("id");

	if (!id) {
		return NextResponse.json(
			{
				status: 400,
				success: false,
				message: "product ID is required",
			},
			{ status: 400 }
		);
	}

	if (id) {
		const response = await deleteProductVariant(id);
		return new Response(JSON.stringify(response), {
			status: response.status,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
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
