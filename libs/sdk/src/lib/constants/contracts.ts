import { SupportedChainId } from "./chains";

export const ALL_CONTRACT_ADDRESS = {
  nftFactory: {
    [SupportedChainId.BITTORRENT_DONAU]:
      "0x31b5da73d8c972b84193B7AF0D8503BFD01a4583",
    [SupportedChainId.MOONBEAM]: "",
    [SupportedChainId.MOONRIVER]: "0x31b5da73d8c972b84193B7AF0D8503BFD01a4583",
    [SupportedChainId.MOONBASE_ALPHA]:
      "0x31b5da73d8c972b84193B7AF0D8503BFD01a4583",
  },
  erc1155Cassava: {
    [SupportedChainId.BITTORRENT_DONAU]:
      "0xaf2fb1cB3b3a44f4812cd6A9661449d432F16c2e",
    [SupportedChainId.MOONBEAM]: "",
    [SupportedChainId.MOONRIVER]: "0xaf2fb1cB3b3a44f4812cd6A9661449d432F16c2e",
    [SupportedChainId.MOONBASE_ALPHA]:
      "0xaf2fb1cB3b3a44f4812cd6A9661449d432F16c2e",
  },
  erc721Cassava: {
    [SupportedChainId.BITTORRENT_DONAU]:
      "0xa52f409bCA3a652603AA9345D8Ef20525D8EDf54",
    [SupportedChainId.MOONBEAM]: "",
    [SupportedChainId.MOONRIVER]: "0xa52f409bCA3a652603AA9345D8Ef20525D8EDf54",
    [SupportedChainId.MOONBASE_ALPHA]:
      "0xa52f409bCA3a652603AA9345D8Ef20525D8EDf54",
  },
} as const;

export type ContractAddress = keyof typeof ALL_CONTRACT_ADDRESS;
