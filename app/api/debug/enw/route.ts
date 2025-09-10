import { NextResponse } from "next/server";

export async function GET() {
  try {
    const envCheck = {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI ? "Set" : "Not Set",
      DATABASE_URL: process.env.DATABASE_URL ? "Set" : "Not Set",
      // Add other environment variables you're using
    };
    
    return NextResponse.json({ 
      success: true, 
      environment: envCheck,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    return NextResponse.json({ 
      success: false, 
      message: "Environment check failed",
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}