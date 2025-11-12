import { changePassword } from "@/backend/actions/users/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	try {
		// Extract token from the Authorization header
		const token = request.headers.get("Authorization")?.split(" ")[1];
		if (!token) {
			return NextResponse.json({ success: false, message: "Authorization token is required." }, { status: 403 });
		}

		// Parse request body
		const body = await request.json();
		const { oldPassword, newPassword } = body;

		// Validate required fields
		if (!oldPassword || !newPassword) {
			return NextResponse.json(
				{ success: false, message: "Missing required fields: oldPassword and newPassword." },
				{ status: 400 }
			);
		}

		// Call the `changePassword` function
		const response = await changePassword(oldPassword, newPassword, token);

		// Return the response from `changePassword`
		return NextResponse.json(response, { status: response.status });
	} catch (error: unknown) {
		console.error("Error in POST /change-password:", error);
		return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 });
	}
}
