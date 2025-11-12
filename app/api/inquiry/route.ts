import { createInquiry, getAllInquiries } from "@/backend/actions/inquiries/inquiry";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);

		// Extract and validate query parameters
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc" | undefined;

		// Validate sortOrder to ensure it's either "desc" or "asc"
		const validSortOrder: "desc" | "asc" | undefined =
			sortOrder === "desc" || sortOrder === "asc" ? sortOrder : undefined;

		const addData = await getAllInquiries({
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
			},
		});
	}
}

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const addData = await createInquiry(body);

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
