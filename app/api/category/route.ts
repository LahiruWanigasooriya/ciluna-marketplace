import {
	createCategory,
	deleteCategory,
	getAllCategories,
	getCategoryById,
	updateCategory,
} from "@/backend/actions/categories/category";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract and validate query parameters
		const categoryId = searchParams.get("categoryId");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc" | undefined;

		if (categoryId) {
			const categoryData = await getCategoryById(categoryId);

			if (!categoryData || categoryData.status === 404) {
				return new Response(JSON.stringify({ success: false, message: "Category not found" }), {
					status: 404,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				});
			}

			return new Response(JSON.stringify(categoryData), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*", // Add CORS header
				},
			});
		}

		// Validate sortOrder to ensure it's either "desc" or "asc"
		const validSortOrder: "desc" | "asc" | undefined =
			sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined;

		const addData = await getAllCategories({
			page,
			limit,
			search,
			sortBy,
			sortOrder: validSortOrder,
		});

		return new Response(JSON.stringify(addData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	} catch (error: unknown) {
		// Default error message
		let errorMessage = "Internal server error";

		// Safely access the error message if available
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return new Response(JSON.stringify({ success: false, message: errorMessage }), {
			status: 500,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const addData = await createCategory(body);

		return new Response(JSON.stringify(addData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
			},
		});
	} catch (error: unknown) {
		// Default error message if the error does not have a message property
		let errorMessage = "Internal server error";

		// Check if error is an instance of Error to safely access the message
		if (error instanceof Error) {
			errorMessage = error.message;
		}

		return new Response(errorMessage, {
			status: 500,
		});
	}
}

export async function PUT(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const categoryId = searchParams.get("categoryId");
		const body = await request.json();
		if (categoryId) {
			const result = await updateCategory(categoryId, body);
			// const jsonResponse = NextResponse.json(result, { status: result.status });
			// jsonResponse.headers.set("Access-Control-Allow-Origin", "*");
			// jsonResponse.headers.set("Access-Control-Allow-Methods", "PUT, OPTIONS");
			// jsonResponse.headers.set(
			//   "Access-Control-Allow-Headers",
			//   "Content-Type, Authorization"
			// );
			// return jsonResponse;
			return new Response(JSON.stringify({ result, success: result.status }), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}

		// Add CORS headers
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

	const categoryId = searchParams.get("categoryId");

	if (!categoryId) {
		return NextResponse.json(
			{
				status: 400,
				success: false,
				message: "category ID is required",
			},
			{ status: 400 }
		);
	}

	if (categoryId) {
		const response = await deleteCategory(categoryId);

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
