import { deleteUser, getAllUsers, getUserById } from "@/backend/actions/users/user";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const { searchParams } = new URL(request.url);
		const userId = searchParams.get("userId");
		const page = parseInt(searchParams.get("page") || "1", 10);
		const limit = parseInt(searchParams.get("limit") || "10", 10);
		const search = searchParams.get("search") || "";
		const sortBy = searchParams.get("sortBy") || "createdAt";
		const sortOrder = searchParams.get("sortOrder") as "desc" | "asc";

		if (userId) {
			const userData = await getUserById(userId);

			if (!userData || userData.status === 404) {
				return new Response(JSON.stringify({ success: false, message: "User not found" }), {
					status: 404,
					headers: {
						"Content-Type": "application/json",
						"Access-Control-Allow-Origin": "*",
					},
				});
			}
			return new Response(JSON.stringify(userData), {
				status: 200,
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
				},
			});
		}

		const getUsers = await getAllUsers({
			page,
			limit,
			search,
			sortBy,
			sortOrder,
		});

		return new Response(JSON.stringify(getUsers), {
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

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);

	const userId = searchParams.get("userId");

	if (!userId) {
		return NextResponse.json(
			{
				status: 400,
				success: false,
				message: "Product ID is required",
			},
			{ status: 400 }
		);
	}

	const deleteResponse = await deleteUser(userId);

	// Create the response using NextResponse
	const jsonResponse = NextResponse.json(
		{
			status: deleteResponse.status,
			success: deleteResponse.success,
			message: deleteResponse.message,
			error: deleteResponse.error,
		},
		{ status: deleteResponse.status }
	);

	// Add CORS headers
	jsonResponse.headers.set("Access-Control-Allow-Origin", "*");
	jsonResponse.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
	jsonResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

	return jsonResponse;
}

export async function OPTIONS(request: Request) {
	return new Response(null, {
		status: 200,
		headers: {
			"Access-Control-Allow-Origin": "*",
			"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type, Authorization",
		},
	});
}
