export type TokenBalance = {
  contractAddress: string;
  symbol: string;
  name: string;
  balance: string;
  decimals: number;
  logoUrl?: string;
  fiatValue?: number;
};

export type NftHolding = {
  contractAddress: string;
  tokenId: string;
  name?: string;
  image?: string;
  collectionName?: string;
};

export type LpPosition = {
  poolAddress: string;
  poolName: string;
  token0: string;
  token1: string;
  usdValue: number;
  sharePercent?: number;
};

export type ActivityItem = {
  hash: string;
  timestamp: number;
  type: string;
  description: string;
  valueUsd?: number;
};

export type OnchainProfile = {
  address: string;
  ens?: string;
  tokens: TokenBalance[];
  nfts: NftHolding[];
  lpPositions: LpPosition[];
  activities: ActivityItem[];
  totalPortfolioUsd: number;
  totalTxCount: number;
  uniqueContracts: number;
  mintCount: number;
  stakingTxCount: number;
  volumeUsd: number;
};

export type ScoreBreakdown = {
  score: number;
  tokensPoints: number;
  nftsPoints: number;
  lpPoints: number;
  stakingPoints: number;
  txPoints: number;
  volumePoints: number;
  mintPoints: number;
  contractPoints: number;
};

