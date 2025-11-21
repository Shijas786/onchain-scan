import { NextRequest, NextResponse } from "next/server";
import { createPublicClient, http } from "viem";
import { mainnet } from "viem/chains";

// Use mainnet for ENS resolution
const client = createPublicClient({
    chain: mainnet,
    transport: http(),
});

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
        return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    try {
        const address = await client.getEnsAddress({
            name: name,
        });

        if (!address) {
            return NextResponse.json({ error: "ENS name not found" }, { status: 404 });
        }

        return NextResponse.json({ address });
    } catch (error) {
        console.error("ENS resolution error:", error);
        return NextResponse.json({ error: "Failed to resolve ENS" }, { status: 500 });
    }
}
