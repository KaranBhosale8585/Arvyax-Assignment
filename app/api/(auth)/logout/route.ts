import { logoutUser } from "@/utils/jwt";
import { NextResponse } from "next/server";

export async function POST() {
  const result = await logoutUser();
  return NextResponse.json(result);
}
