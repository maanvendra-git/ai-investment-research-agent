import { NextResponse } from "next/server";

import { runInvestmentGraph } from "@/agents/graph";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = body?.company;

    if (!company || typeof company !== "string") {
      return NextResponse.json(
        {
          success: false,
          error: "Company name is required",
        },
        { status: 400 }
      );
    }

    console.log(`API: Research requested for ${company}`);

    const report = await runInvestmentGraph(company);

    return NextResponse.json({
      success: true,
      report,
    });
  } catch (error) {
    console.error("Research API error:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Research failed",
      },
      { status: 500 }
    );
  }
}