import { SupportedChainId } from "./chains";

export const SUBSCAN_API = {
  [SupportedChainId.MOONBASE_ALPHA]:
    "https://moonbase.api.subscan.io/api/scan/evm",
  [SupportedChainId.MOONBEAM]: "https://moonbeam.api.subscan.io/api/scan/evm",
  [SupportedChainId.MOONRIVER]: "https://moonriver.api.subscan.io/api/scan/evm",
};
