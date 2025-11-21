import { NextRequest, NextResponse } from "next/server";
import { fetchWalletData } from "@/lib/covalent";
import { calculateScore } from "@/lib/scoring";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const address = searchParams.get("address");

    if (!address) {
        return NextResponse.json({ error: "Address is required" }, { status: 400 });
    }

    try {
        const walletData = await fetchWalletData(address);
        const score = calculateScore(walletData);

        return NextResponse.json({
            walletData,
            score,
        });
    } catch (error) {
        console.error("Scan error:", error);
        return NextResponse.json({ error: "Failed to scan wallet" }, { status: 500 });
    }
}
