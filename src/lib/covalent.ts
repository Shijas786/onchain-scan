import { z } from "zod";

const COVALENT_API_KEY = process.env.COVALENT_API_KEY;
const BASE_CHAIN_NAME = "base-mainnet";

if (!COVALENT_API_KEY) {
    console.warn("Missing COVALENT_API_KEY in environment variables");
}

// Types
export interface TokenBalance {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    logo_url: string;
    balance: string;
    quote: number;
    pretty_quote: string;
    type: "cryptocurrency" | "stablecoin" | "nft" | "dust";
}

export interface NftBalance {
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    token_id: string;
    token_url: string;
    external_data?: {
        image?: string;
        name?: string;
    };
}

export interface Transaction {
    tx_hash: string;
    block_signed_at: string;
    successful: boolean;
    from_address: string;
    to_address: string;
    value: string;
    value_quote: number;
    fees_paid: string;
}

export interface WalletData {
    address: string;
    tokens: TokenBalance[];
    nfts: NftBalance[];
    transactions: Transaction[];
    liquidity: any[]; // Placeholder for DEX liquidity
}

// Fetchers
export async function fetchTokenBalances(address: string): Promise<TokenBalance[]> {
    if (!COVALENT_API_KEY) return [];
    try {
        const url = `https://api.covalenthq.com/v1/${BASE_CHAIN_NAME}/address/${address}/balances_v2/?key=${COVALENT_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        return data.data?.items || [];
    } catch (error) {
        console.error("Error fetching token balances:", error);
        return [];
    }
}

export async function fetchTransactions(address: string): Promise<Transaction[]> {
    if (!COVALENT_API_KEY) return [];
    try {
        const url = `https://api.covalenthq.com/v1/${BASE_CHAIN_NAME}/address/${address}/transactions_v2/?key=${COVALENT_API_KEY}&page-size=100`;
        const res = await fetch(url);
        const data = await res.json();
        return data.data?.items || [];
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return [];
    }
}

export async function fetchNftBalances(address: string): Promise<NftBalance[]> {
    if (!COVALENT_API_KEY) return [];
    try {
        const url = `https://api.covalenthq.com/v1/${BASE_CHAIN_NAME}/address/${address}/balances_nft/?key=${COVALENT_API_KEY}`;
        const res = await fetch(url);
        const data = await res.json();
        // Transform data to match interface if needed, Covalent structure varies
        return data.data?.items || [];
    } catch (error) {
        console.error("Error fetching NFT balances:", error);
        return [];
    }
}

export async function fetchDexLiquidity(address: string): Promise<any[]> {
    // Note: Covalent DEX liquidity endpoint might be different or require specific params
    // For now, we'll try the standard endpoint if available or mock it if not stable
    // The prompt mentioned /dex_liquidity/
    if (!COVALENT_API_KEY) return [];
    try {
        // This endpoint might be experimental or specific
        // Using a generic approach or skipping if not found in standard docs immediately
        // But prompt requested it: /v1/base-mainnet/address/{address}/dex_liquidity/
        const url = `https://api.covalenthq.com/v1/${BASE_CHAIN_NAME}/address/${address}/dex_liquidity/?key=${COVALENT_API_KEY}`;
        const res = await fetch(url);
        if (!res.ok) return []; // Handle 404 or other errors gracefully
        const data = await res.json();
        return data.data?.items || [];
    } catch (error) {
        console.error("Error fetching DEX liquidity:", error);
        return [];
    }
}

export async function fetchWalletData(address: string): Promise<WalletData> {
    const [tokens, transactions, nfts, liquidity] = await Promise.all([
        fetchTokenBalances(address),
        fetchTransactions(address),
        fetchNftBalances(address),
        fetchDexLiquidity(address),
    ]);

    return {
        address,
        tokens,
        transactions,
        nfts,
        liquidity,
    };
}
