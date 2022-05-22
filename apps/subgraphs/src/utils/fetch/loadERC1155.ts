/*eslint-disable prefer-const*/
import { Address, BigInt } from "@graphprotocol/graph-ts";
import {
  Account,
  ERC1155NftContract,
  ERC1155Nft,
  ERC1155Balance,
} from "../../../generated/schema";
import { ERC1155 } from "../../../generated/ERC1155/ERC1155";
import {
  loadAccount,
  loadAllNft,
  supportsInterface,
  replaceURI,
  ONE_BIG_INT,
  ZERO_BIG_INT,
  ZERO_BIG_DECIMAL,
} from "..";

export function loadERC1155Contract(address: Address): ERC1155NftContract {
  let erc1155 = ERC1155.bind(address);
  let account = loadAccount(address);
  let contract = ERC1155NftContract.load(account.id);
  let allNft = loadAllNft();

  if (contract == null) {
    contract = new ERC1155NftContract(account.id);
    contract.asAccount = account.id;
    contract.supportsERC2981 = supportsInterface(erc1155, "0x2a55205a");
    contract.totalNfts = ZERO_BIG_INT;
    contract.totalOwners = ZERO_BIG_INT;
    account.asERC1155 = contract.id;
    allNft.totalERC1155NftContracts =
      allNft.totalERC1155NftContracts.plus(ONE_BIG_INT);
    allNft.save();
    contract.save();
  }
  account.save();

  return contract;
}

export function loadERC1155Balance(
  token: ERC1155Nft,
  account: Account | null
): ERC1155Balance {
  let id = token.id.concat("/").concat(account ? account.id : "totalSupply");
  let balance = ERC1155Balance.load(id);
  let allNft = loadAllNft();

  if (balance == null) {
    balance = new ERC1155Balance(id);
    balance.nftContract = token.nftContract;
    balance.nft = token.id;
    balance.account = account ? account.id : null;
    balance.value = ZERO_BIG_DECIMAL;
    balance.valueExact = ZERO_BIG_INT;
    allNft.totalERC1155Holders = allNft.totalERC1155Holders.plus(ONE_BIG_INT);
    allNft.save();
    balance.save();
  }

  return balance as ERC1155Balance;
}

export function loadERC1155Nft(
  contract: ERC1155NftContract,
  tokenId: BigInt
): ERC1155Nft {
  let id = contract.id.concat("/").concat(tokenId.toHex());
  let nft = ERC1155Nft.load(id);
  let allNft = loadAllNft();

  if (nft == null) {
    let erc1155 = ERC1155.bind(Address.fromString(contract.id));
    let try_uri = erc1155.try_uri(tokenId);
    nft = new ERC1155Nft(id);
    nft.nftContract = contract.id;
    nft.tokenId = tokenId;
    nft.totalSupply = loadERC1155Balance(nft as ERC1155Nft, null).id;
    nft.metadataURL = try_uri.reverted
      ? null
      : replaceURI(try_uri.value, tokenId);
    allNft.totalERC1155TokensCreated =
      allNft.totalERC1155TokensCreated.plus(ONE_BIG_INT);
    allNft.save();
  }

  return nft as ERC1155Nft;
}
