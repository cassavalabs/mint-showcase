/*eslint-disable prefer-const*/
import { Transfer } from "../../generated/ERC721/ERC721";
import {
  loadAccount,
  loadAllNft,
  loadERC721Contract,
  loadERC721Nft,
  ZERO_ADDRESS_STRING,
  ONE_BIG_INT,
} from "../utils";

export function handleTransfer(event: Transfer): void {
  let contract = loadERC721Contract(event.address);
  let allNft = loadAllNft();

  if (contract != null) {
    let token = loadERC721Nft(contract, event.params.tokenId);
    let from = loadAccount(event.params.from);
    let to = loadAccount(event.params.to);

    token.owner = to.id;

    //Minting
    if (from.id == ZERO_ADDRESS_STRING) {
      token.dateMinted = event.block.timestamp;
      allNft.totalERC721TokensCreated =
        allNft.totalERC721TokensCreated.plus(ONE_BIG_INT);
      contract.totalNfts = contract.totalNfts.plus(ONE_BIG_INT);
    }

    //Burning reduce totalNfts by 1
    if (to.id == ZERO_ADDRESS_STRING) {
      contract.totalNfts = contract.totalNfts.minus(ONE_BIG_INT);
    }

    allNft.save();
    contract.save();
    token.save();
  }
}
