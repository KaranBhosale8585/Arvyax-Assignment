
import { getDB } from "@/lib/db";
import { User } from "@/models/User";
import { verifyToken } from "@/utils/jwt";
import { cookies } from "next/headers";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const payload: any = await verifyToken(token);
    if (!payload) return null;

    await getDB();

    const user = await User.findOne({ email: payload.email });

    if (!user) return null;

    return user;
  } catch (error) {
    console.error("Invalid token or DB error:", error);
    return null;
  }
}
