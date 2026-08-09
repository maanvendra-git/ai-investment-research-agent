import { NextResponse } from "next/server";
import { researchCompany } from "@/services/research";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const company = body.company?.trim();

    if (!company) {
      return NextResponse.json(
        {
          success: false,
          error: "Company name is required",
        },
        { status: 400 }
      );
    }

    const result = await researchCompany(company);

    if (!result?.success || !result.report) {
      return NextResponse.json(
        {
          success: false,
          error: "Research failed",
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      report: result.report,
    });
  } catch (error) {
    console.error("Research API Error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Research failed",
      },
      { status: 500 }
    );
  }
}