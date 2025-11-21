import { NextRequest, NextResponse } from "next/server";
import { resolveEns } from "@/lib/ens";
import { getOnchainProfile } from "@/lib/covalent";
import { calculateScore } from "@/lib/scoring";

export async function GET(req: NextRequest) {
  const addressOrEns = req.nextUrl.searchParams.get("address");
  if (!addressOrEns) {
    return NextResponse.json({ error: "Missing address" }, { status: 400 });
  }

  try {
    const addr = await resolveEns(addressOrEns);
    if (!addr || addr === addressOrEns && addressOrEns.endsWith(".eth")) {
      return NextResponse.json(
        { error: "ENS resolution failed or returned null" },
        { status: 400 }
      );
    }
    const profile = await getOnchainProfile(addr);
    const breakdown = calculateScore(profile);
    return NextResponse.json({ breakdown }, { status: 200 });
  } catch (e: any) {
    console.error("API SCORE ERROR:", e);
    return NextResponse.json(
      { 
        error: e?.message ?? "Failed to calculate score",
        details: process.env.NODE_ENV === "development" ? e?.stack : undefined
      },
      { status: 500 }
    );
  }
}

