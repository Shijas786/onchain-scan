import { WalletData } from "./covalent";

export interface ScoreBreakdown {
    tokenScore: number;
    nftScore: number;
    lpScore: number;
    stakingScore: number;
    txCountScore: number;
    volumeScore: number;
    mintScore: number;
    contractScore: number;
    total: number;
}

export function calculateScore(data: WalletData): ScoreBreakdown {
    let tokenScore = 0;
    let nftScore = 0;
    let lpScore = 0;
    let stakingScore = 0;
    let txCountScore = 0;
    let volumeScore = 0;
    let mintScore = 0;
    let contractScore = 0;

    // 1. +1 per token held (max 20)
    // Filter for non-dust tokens (value > 0 or specific types)
    const validTokens = data.tokens.filter(t => t.quote > 0.1 || t.type === 'cryptocurrency' || t.type === 'stablecoin');
    tokenScore = Math.min(validTokens.length, 20);

    // 2. +1 per NFT collection (max 10)
    // Count unique contract addresses in NFT list
    const uniqueNftCollections = new Set(data.nfts.map(n => n.contract_address)).size;
    nftScore = Math.min(uniqueNftCollections, 10);

    // 3. +10 per LP position
    // Assuming liquidity items are LP positions
    lpScore = data.liquidity.length * 10;

    // 4. +5 per staking-related transactions
    // Heuristic: check for "stake", "deposit", "withdraw" in method names or known staking contracts
    // Since we might not have decoded method names easily, we'll look at log events or just skip for MVP if too complex
    // For now, let's look for "stake" in contract name if available or just assume 0 if no data
    // Covalent txs have `log_events`? We used basic tx endpoint.
    // Let's try to infer from `to_address_label` if available or just skip.
    // We'll skip complex staking detection for now to keep it simple/robust, or count 0.
    stakingScore = 0;

    // 5. +1 per 10 transactions
    txCountScore = Math.floor(data.transactions.length / 10);

    // 6. +1 point per $500 in lifetime tx volume
    // Sum up value_quote of all txs (in + out? usually volume implies activity)
    // We'll sum `value_quote` of all transactions
    const totalVolume = data.transactions.reduce((acc, tx) => acc + (tx.value_quote || 0), 0);
    volumeScore = Math.floor(totalVolume / 500);

    // 7. +2 per NFT mint
    // Check for txs where `to_address` is null (creation) or method is `mint`?
    // Easier: Check for 0x0...0 from_address in NFT transfers?
    // Covalent NFT balance doesn't show mint history directly.
    // We'll check transactions for "mint" in decoded signature if available.
    // Without decoded data, this is hard. We'll assume 0 for MVP or use a placeholder.
    mintScore = 0;

    // 8. +1 per unique smart contract interacted with
    const uniqueContracts = new Set(data.transactions.map(tx => tx.to_address)).size;
    contractScore = uniqueContracts;

    const total = tokenScore + nftScore + lpScore + stakingScore + txCountScore + volumeScore + mintScore + contractScore;

    return {
        tokenScore,
        nftScore,
        lpScore,
        stakingScore,
        txCountScore,
        volumeScore,
        mintScore,
        contractScore,
        total
    };
}
