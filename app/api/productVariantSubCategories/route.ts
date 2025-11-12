import {
	createProductVariantSubCategory,
	getAllProductVariantSubCategories,
} from "@/backend/actions/productVariantSubCategory/productVariantSubCategory";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		if (!body || (Array.isArray(body) && body.length === 0)) {
			return new Response(JSON.stringify({ success: false, message: "Request body cannot be empty" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		// Check if the request is for bulk category creation
		const isBulkCreate = Array.isArray(body);

		// Process the request
		const addData = await createProductVariantSubCategory(body);

		return new Response(JSON.stringify(addData), {
			status: addData.status || (isBulkCreate ? 206 : 201), // 206 for partial success, 201 for success
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: unknown) {
		return new Response(
			JSON.stringify({ success: false, message: error instanceof Error ? error.message : "Internal server error" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract query parameters
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc";

		// Fetch product variant categories with optional filtering by productId
		const getData = await getAllProductVariantSubCategories({
			page,
			limit,
			search,
			sortBy,
			sortOrder,
		});

		return new Response(JSON.stringify(getData), {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch (error: unknown) {
		return new Response(
			JSON.stringify({ success: false, message: error instanceof Error ? error.message : "Internal server error" }),
			{ status: 500, headers: { "Content-Type": "application/json" } }
		);
	}
}
