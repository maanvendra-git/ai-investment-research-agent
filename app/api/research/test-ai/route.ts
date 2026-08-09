import { NextResponse } from "next/server";
import { openai } from "../../../../lib/openai";

export async function GET() {
  try {
    const response = await openai.responses.create({
      model: "gpt-5-mini",
      input: "Say exactly: OpenAI connection successful!",
    });

    return NextResponse.json({
      success: true,
      message: response.output_text,
    });
  } catch (error) {
    console.error("OpenAI Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "OpenAI connection failed",
      },
      { status: 500 }
    );
  }
}