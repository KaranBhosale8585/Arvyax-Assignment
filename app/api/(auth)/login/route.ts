import { getDB } from "@/lib/db";
import { User } from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email or password is missing" },
        {
          status: 400,
        },
      );
    }

    await getDB();
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User not found" },
        {
          status: 401,
        },
      );
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        {
          status: 401,
        },
      );
    }

    const token = await user.generateJWT();

    return NextResponse.json(
      { message: "Login successful", token },
      {
        status: 200,
      },
    );

  } catch (error) {
    return NextResponse.json(
      { message: "Invalid request" },
      {
        status: 500,
      },
    );
  }
}
