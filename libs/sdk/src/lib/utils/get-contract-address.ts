import { ALL_CONTRACT_ADDRESS, ContractAddress } from "../constants/contracts";
import { SupportedChainId } from "../constants/chains";

export const getContractAddress = (
  address: ContractAddress,
  chainId: SupportedChainId
) => {
  return ALL_CONTRACT_ADDRESS[address][chainId];
};

export const getNftFactoryAddress = (chainId: SupportedChainId) => {
  return getContractAddress("nftFactory", chainId);
};

export const getERC721CollectionAddress = (chainId: SupportedChainId) => {
  return getContractAddress("erc721Cassava", chainId);
};

export const getERC1155CollectionAddress = (chainId: SupportedChainId) => {
  return getContractAddress("erc1155Cassava", chainId);
};
