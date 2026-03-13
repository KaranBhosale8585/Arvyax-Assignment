import { getDB } from "@/lib/db";
import { Journal } from "@/models/Journal";
import { getCurrentUser } from "@/utils/getCurrentUser";
import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { ambience, text } = await req.json();

    if (!ambience || !text) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 },
      );
    }

    await getDB();

    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const prompt = `
You are an AI journal emotion analyzer.

Analyze the emotion of the journal text.

Return JSON only. Do not include markdown or explanation.

{
  "emotion": "",
  "keywords": [],
  "summary": ""
}

Journal Text: ${text}
`;

    const ai = new GoogleGenAI({
      apiKey: process.env.GOOGLE_API_KEY!,
    });

    const resp = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    console.log(resp);

    if (!resp.text) {
      return NextResponse.json({ message: "AI Error" }, { status: 500 });
    }

    const parsed = JSON.parse(resp.text);
    const entry = await Journal.create({
      userId: user._id,
      ambience,
      text,
      emotion: parsed.emotion || "",
      keywords: parsed.keywords || [],
      summary: parsed.summary || "",
    });
    return NextResponse.json(entry);
  } catch (error: any) {
    return NextResponse.json(
      {
        error: error.message || "Server error",
      },
      { status: 500 },
    );
  }
}
