export type LoadingsSlice = {
  txInProgress: boolean;
  successCount: number;
  tokensListLoading: boolean;
};

export type AppSlice = {
  walletAddress: string;
  isTokenModalOpen: boolean;
};
