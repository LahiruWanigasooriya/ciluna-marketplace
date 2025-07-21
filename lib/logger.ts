"use server";

import { dbConnectMarketPlace } from "@/lib/dbConnect";
import Log from "@/models/log";
import { getSession } from "@/lib/session";

export async function logAction(action: string, details: Record<string, any> = {}) {
  try {
    const session = await getSession();
    console.log("logAction: Session:", session);

    if (!session || !["admin", "superadmin"].includes(session.role)) {
      console.log("logAction: No valid session or role, skipping log. Action:", action);
      return;
    }

    await dbConnectMarketPlace();
    const log = new Log({
      userId: session.userId,
      username: session.username || "Unknown",
      role: session.role,
      action,
      details,
    });
    await log.save();
    console.log("logAction: Logged action:", action, "for userId:", session.userId, "username:", session.username);
  } catch (err) {
    console.error("logAction: Error:", err);
  }
}