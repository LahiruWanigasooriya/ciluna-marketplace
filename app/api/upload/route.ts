import { uploadImage } from "@/actions/utils/cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { base64Image } = body;

    // Validate input
    if (!base64Image || typeof base64Image !== "string") {
      const jsonResponse = NextResponse.json(
        {
          status: 400,
          success: false,
          message: "Missing or invalid base64Image field",
        },
        { status: 400 }
      );

      jsonResponse.headers.set("Access-Control-Allow-Origin", "*");
      jsonResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
      jsonResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

      return jsonResponse;
    }

    // Upload image to Cloudinary
    const imageUrl = await uploadImage(base64Image);

    const jsonResponse = NextResponse.json(
      {
        status: 200,
        success: true,
        message: "Image uploaded successfully",
        data: imageUrl,
      },
      { status: 200 }
    );

    // Add CORS headers
    jsonResponse.headers.set("Access-Control-Allow-Origin", "*");
    jsonResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    jsonResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return jsonResponse;
  } catch (error: any) {
    const jsonResponse = NextResponse.json(
      {
        status: 500,
        success: false,
        message: "Failed to upload image",
        error: error.message,
      },
      { status: 500 }
    );

    jsonResponse.headers.set("Access-Control-Allow-Origin", "*");
    jsonResponse.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    jsonResponse.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");

    return jsonResponse;
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set("Access-Control-Allow-Origin", "*");
  response.headers.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  return response;
}