/*eslint-disable prefer-const*/
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Account,
  ERC721NftContract,
  ERC721Nft,
} from "../../../generated/schema";
import { ERC721 } from "../../../generated/ERC721/ERC721";
import {
  loadAccount,
  loadAllNft,
  supportsInterface,
  ONE_BIG_INT,
  ZERO_BIG_INT,
} from "..";

export function loadERC721Contract(address: Address): ERC721NftContract | null {
  let erc721 = ERC721.bind(address);

  let account = loadAccount(address);
  let detectionId = account.id.concat("/erc721detection");
  let detectionAccount = Account.load(detectionId);

  if (detectionAccount == null) {
    detectionAccount = new Account(detectionId);
    let introspection_01ffc9a7 = supportsInterface(erc721, "01ffc9a7"); // ERC165
    let introspection_80ac58cd = supportsInterface(erc721, "80ac58cd"); // ERC721
    let introspection_00000000 = supportsInterface(erc721, "00000000", false);
    let isERC721 =
      introspection_01ffc9a7 &&
      introspection_80ac58cd &&
      introspection_00000000;
    detectionAccount.asERC721 = isERC721 ? account.id : null;
    detectionAccount.save();
  }

  if (detectionAccount.asERC721 != null) {
    let contract = ERC721NftContract.load(account.id);
    let allNft = loadAllNft();

    if (contract == null) {
      contract = new ERC721NftContract(account.id);
      let try_name = erc721.try_name();
      let try_symbol = erc721.try_symbol();
      contract.name = try_name.reverted ? "" : try_name.value;
      contract.symbol = try_symbol.reverted ? "" : try_symbol.value;
      contract.supportsMetadata = supportsInterface(erc721, "5b5e139f"); // ERC721Metadata
      contract.supportsERC2981 = supportsInterface(erc721, "0x2a55205a");
      contract.asAccount = account.id;
      contract.totalNfts = ZERO_BIG_INT;
      contract.totalOwners = ZERO_BIG_INT;
      account.asERC721 = account.id;
      allNft.totalERC721NftContracts =
        allNft.totalERC721NftContracts.plus(ONE_BIG_INT);
      allNft.save();
      contract.save();
      account.save();
    }
    return contract as ERC721NftContract;
  }

  return null;
}

export function loadERC721Nft(
  contract: ERC721NftContract,
  tokenId: BigInt
): ERC721Nft {
  let id = contract.id.concat("/").concat(tokenId.toHex());
  let nft = ERC721Nft.load(id);
  let allNft = loadAllNft();

  if (nft == null) {
    nft = new ERC721Nft(id);
    nft.nftContract = contract.id;
    nft.tokenId = tokenId;
    allNft.totalERC721TokensCreated =
      allNft.totalERC721TokensCreated.plus(ONE_BIG_INT);
    allNft.save();

    if (contract.supportsMetadata) {
      let erc721 = ERC721.bind(Address.fromString(contract.id));
      let try_tokenURI = erc721.try_tokenURI(tokenId);
      nft.metadataURL = try_tokenURI.reverted ? "" : try_tokenURI.value;
    }
  }

  return nft as ERC721Nft;
}
