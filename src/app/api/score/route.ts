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
    const profile = await getOnchainProfile(addr);
    const breakdown = calculateScore(profile);
    return NextResponse.json({ breakdown }, { status: 200 });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Failed to calculate score" },
      { status: 500 }
    );
  }
}

