import { dbConnectMarketPlace } from "@/lib/dbConnect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnectMarketPlace();
    return NextResponse.json({ 
      success: true, 
      message: "Database connected successfully",
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: "Database connection failed",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}