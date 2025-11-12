import { deleteUser, getUserProfile } from "@/backend/actions/users/user";
import { NextRequest, NextResponse } from "next/server";

// get specific user from token
export async function GET(request: NextRequest) {
	try {
		// Extract token from the Authorization header
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		// Call the `getCart` action with the token
		const response: any = await getUserProfile(token);

		// Return the response from `getCart`
		if (response.success) {
			return NextResponse.json(response, { status: 200 });
		} else {
			return NextResponse.json(response, { status: 404 });
		}
	} catch (error: unknown) {
		console.error("Error in GET /cart:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}

export async function DELETE(request: Request) {
	const { searchParams } = new URL(request.url);

	const userId = searchParams.get("userId");

	if (userId) {
		const response = await deleteUser(userId);

		return new Response(JSON.stringify(response), {
			status: response.status,
		});
	}
}
