export enum SupportedChainId {
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
