
import { getDB } from "@/lib/db";
import { Journal } from "@/models/Journal";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await getDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const JournalLogs = await Journal.find({ userId: user._id }).sort({
      createdAt: -1,
    });

    return NextResponse.json({
      journalLogs: JournalLogs,
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching logs" },
      { status: 500 },
    );
  }
}
