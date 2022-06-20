export enum SupportedChainId {
<<<<<<< HEAD
  BINANCE_CHAIN = 56,
  BOBA = 288,
  ETHEREUM = 1,
=======
>>>>>>> 5e7112d42a6c848a8cbadaae1d686f74d53ea8d9
  MOONBEAM = 1284,
  MOONRIVER = 1285,
  MOONBASE_ALPHA = 1287,
}

/**
 * Array of all the supported chain IDs
 */
export const ALL_SUPPORTED_CHAIN_IDS: SupportedChainId[] = Object.values(
  SupportedChainId
).filter((id) => typeof id === "number") as SupportedChainId[];
