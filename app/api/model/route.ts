import { createModel, deleteModel, getAllModels, getModelById, updateModel } from "@/backend/actions/model/model";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const addData = await createModel(body);

		return new Response(JSON.stringify(addData), {
			status: 200,
			headers: {
				"Content-Type": "application/json",
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

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract and validate query parameters
		const modelId = searchParams.get("modelId");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc" | undefined;

		if (modelId) {
			const modelData = await getModelById(modelId);

			if (!modelData || modelData.status === 404) {
				return new Response(JSON.stringify({ success: false, message: "Model not found" }), {
					status: 404,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				});
			}

			return new Response(JSON.stringify(modelData), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}
		// Validate sortOrder to ensure it's either "desc" or "asc"
		const validSortOrder: "desc" | "asc" | undefined =
			sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined;

		const addData = await getAllModels({
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

export async function PUT(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const modelId = searchParams.get("modelId");
		const body = await request.json();
		if (modelId) {
			const result = await updateModel(modelId, body);
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

	const modelId = searchParams.get("modelId");

	if (!modelId) {
		return NextResponse.json(
			{
				status: 400,
				success: false,
				message: "Brand ID is required",
			},
			{ status: 400 }
		);
	}

	if (modelId) {
		const response = await deleteModel(modelId);

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
