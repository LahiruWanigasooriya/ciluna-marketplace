import { checkUserAndGenerateToken } from "@/backend/actions/users/user";

export async function POST(request: Request) {
	try {
		const body = await request.json();

		const loginResponse = await checkUserAndGenerateToken(body);

		return new Response(JSON.stringify(loginResponse), {
			status: loginResponse.status,
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
