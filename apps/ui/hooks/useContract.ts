import {
  getNftFactoryAddress,
  CassavaLandNFTFactory__factory,
  ERC1155Cassava__factory,
  ERC721Cassava__factory,
} from "@cassavaland/sdk";
import { useMemo } from "react";
import { useActiveWeb3 } from "./useWeb3";

export const useNftFactoryContract = () => {
  const { chainId, library } = useActiveWeb3();

  return useMemo(() => {
    if (!chainId || !library) return null;

    const contractAddress = getNftFactoryAddress(chainId);

    return CassavaLandNFTFactory__factory.connect(
      contractAddress,
      library.getSigner()
    );
  }, [chainId, library]);
};

export const useERC1155CassavaContract = (collectionAddress: string) => {
  const { chainId, library } = useActiveWeb3();

  return useMemo(() => {
    if (!chainId || !library || !collectionAddress) return null;

    return ERC1155Cassava__factory.connect(
      collectionAddress,
      library.getSigner()
    );
  }, [chainId, collectionAddress, library]);
};

export const useERC721CassavaContract = (collectionAddress: string) => {
  const { chainId, library } = useActiveWeb3();

  return useMemo(() => {
    if (!chainId || !library || !collectionAddress) return null;

    return ERC721Cassava__factory.connect(
      collectionAddress,
      library.getSigner()
    );
  }, [chainId, collectionAddress, library]);
};
