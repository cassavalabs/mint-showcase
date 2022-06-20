import { SupportedChainId } from "./chains";

export const ALL_SUBGRAPH_URL = {
  [SupportedChainId.BINANCE_CHAIN]:
    "https://api.thegraph.com/subgraphs/name/iphyman/rare-cassava",
  [SupportedChainId.BOBA]:
    "https://api.thegraph.com/subgraphs/name/iphyman/cassavaland-boba",
  [SupportedChainId.ETHEREUM]:
    "https://api.thegraph.com/subgraphs/name/amxx/nft-mainnet",
  [SupportedChainId.MOONBASE_ALPHA]:
    "https://api.thegraph.com/subgraphs/name/iphyman/cassavaland-moonbase",
  [SupportedChainId.MOONBEAM]:
    "https://api.thegraph.com/subgraphs/name/iphyman/cassavaland-moonbeam",
  [SupportedChainId.MOONRIVER]:
    "https://api.thegraph.com/subgraphs/name/iphyman/cassavaland-moonriver",
} as const;
