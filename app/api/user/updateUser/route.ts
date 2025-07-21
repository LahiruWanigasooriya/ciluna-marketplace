import { updateUserProfile } from "@/actions/users/user";
import { NextRequest, NextResponse } from "next/server";

// Update specific user details from token
export async function PATCH(request: NextRequest) {
  try {
    // Extract token from the Authorization header
    const token = request.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return NextResponse.json(
        { success: false, message: "Authorization token is required." },
        { status: 403 }
      );
    }

    // Parse the request body for update data
    const updateData = await request.json();
    if (!updateData || Object.keys(updateData).length === 0) {
      return NextResponse.json(
        { success: false, message: "No data provided for update." },
        { status: 400 }
      );
    }    

    // Call the `updateUserProfile` action with the token and update data
    const response: any = await updateUserProfile(updateData,token);

    // Return the response from `updateUserProfile`
    if (response.success) {
      return NextResponse.json(response, { status: 200 });
    } else {
      return NextResponse.json(response, { status: response.status || 400 });
    }
  } catch (error: unknown) {
    console.error("Error in PATCH /user:", error);
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
