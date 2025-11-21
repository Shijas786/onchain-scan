import { OnchainProfile, TokenBalance, NftHolding, LpPosition, ActivityItem } from "./types";

const COVALENT_BASE_URL = "https://api.covalenthq.com/v1";
const CHAIN = "base-mainnet";

async function covalentFetch<T>(path: string) {
  const key = process.env.COVALENT_API_KEY;
  if (!key) throw new Error("Missing COVALENT_API_KEY");

  const url = `${COVALENT_BASE_URL}/${CHAIN}${path}${
    path.includes("?") ? "&" : "?"
  }key=${key}`;
  
  console.log("FETCH URL:", url);
  const res = await fetch(url, { cache: "no-store" });
  
  console.log("FETCH STATUS:", res.status);
  
  if (!res.ok) {
    const errorText = await res.text();
    console.error("FETCH ERROR BODY:", errorText);
    throw new Error(`Covalent error: ${res.status} ${res.statusText} - ${errorText}`);
  }
  
  const json = await res.json();
  return json as T;
}

export async function getOnchainProfile(address: string): Promise<OnchainProfile> {
  const [balancesRes, txsRes, nftsRes, lpRes] = await Promise.all([
    covalentFetch<any>(`/address/${address}/balances_v2/?nft=false&no-nft-fetch=true`),
    covalentFetch<any>(`/address/${address}/transactions_v3/?page-size=100`),
    covalentFetch<any>(`/address/${address}/balances_nft/?`),
    covalentFetch<any>(`/address/${address}/dex_liquidity/?page-size=100`)
  ]);

  const tokens: TokenBalance[] =
    balancesRes?.data?.items
      ?.filter((it: any) => it.type === "cryptocurrency")
      .map((it: any) => ({
        contractAddress: it.contract_address,
        symbol: it.contract_ticker_symbol,
        name: it.contract_name,
        balance: it.balance,
        decimals: it.contract_decimals,
        logoUrl: it.logo_url,
        fiatValue: it.quote
      })) ?? [];

  const nfts: NftHolding[] =
    nftsRes?.data?.items?.flatMap((col: any) =>
      (col.nft_data ?? []).map((n: any) => ({
        contractAddress: col.contract_address,
        tokenId: n.token_id,
        name: n.external_data?.name,
        image: n.external_data?.image,
        collectionName: col.contract_name
      }))
    ) ?? [];

  const lpPositions: LpPosition[] =
    lpRes?.data?.items?.map((it: any) => ({
      poolAddress: it.pool_address,
      poolName: it.token_0?.contract_ticker_symbol && it.token_1?.contract_ticker_symbol
        ? `${it.token_0.contract_ticker_symbol}/${it.token_1.contract_ticker_symbol}`
        : "LP Position",
      token0: it.token_0?.contract_ticker_symbol ?? "",
      token1: it.token_1?.contract_ticker_symbol ?? "",
      usdValue: it.token_0_quote + it.token_1_quote,
      sharePercent: it.pool_share
    })) ?? [];

  const txs = txsRes?.data?.items ?? [];

  const activities: ActivityItem[] = txs.map((tx: any) => ({
    hash: tx.tx_hash,
    timestamp: new Date(tx.block_signed_at).getTime(),
    type: tx.successful ? "success" : "failed",
    description: tx.log_events?.[0]?.decoded?.name ?? "Transaction",
    valueUsd: tx.value_quote
  }));

  const totalPortfolioUsd =
    tokens.reduce((acc, t) => acc + (t.fiatValue ?? 0), 0) +
    lpPositions.reduce((acc, lp) => acc + lp.usdValue, 0);

  const totalTxCount = txs.length;
  const uniqueContracts = new Set(
    txs.flatMap((tx: any) => tx.log_events?.map((e: any) => e.sender_contract_address) ?? [])
  ).size;

  const mintCount = txs.filter((tx: any) =>
    tx.log_events?.some((e: any) => e.decoded?.name?.toLowerCase().includes("mint"))
  ).length;

  const stakingTxCount = txs.filter((tx: any) =>
    tx.log_events?.some((e: any) =>
      (e.decoded?.name ?? "").toLowerCase().includes("stake") ||
      (e.decoded?.name ?? "").toLowerCase().includes("unstake")
    )
  ).length;

  const volumeUsd = txs.reduce((acc: number, tx: any) => acc + (tx.value_quote ?? 0), 0);

  return {
    address,
    tokens,
    nfts,
    lpPositions,
    activities,
    totalPortfolioUsd,
    totalTxCount,
    uniqueContracts,
    mintCount,
    stakingTxCount,
    volumeUsd
  };
}
