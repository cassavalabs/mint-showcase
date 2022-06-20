import { AllNft } from "../../../generated/schema";
import { ZERO_BIG_INT } from "../constants";

export function loadAllNft(): AllNft {
  let allNft = AllNft.load("all");

  if (allNft == null) {
    allNft = new AllNft("all");
    allNft.totalERC1155Holders = ZERO_BIG_INT;
    allNft.totalERC1155NftContracts = ZERO_BIG_INT;
    allNft.totalERC1155TokensCreated = ZERO_BIG_INT;
    allNft.totalERC721Holders = ZERO_BIG_INT;
    allNft.totalERC721NftContracts = ZERO_BIG_INT;
    allNft.totalERC721TokensCreated = ZERO_BIG_INT;
    allNft.save();
  }

  return allNft;
}
