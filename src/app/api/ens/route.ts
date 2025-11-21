import { NextRequest, NextResponse } from "next/server";
import { resolveEns } from "@/lib/ens";

export async function GET(req: NextRequest) {
  const nameOrAddress = req.nextUrl.searchParams.get("input");
  if (!nameOrAddress) {
    return NextResponse.json({ error: "Missing input" }, { status: 400 });
  }

  const resolved = await resolveEns(nameOrAddress);
  return NextResponse.json({ address: resolved });
}
