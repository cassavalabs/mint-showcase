import { gql, request } from "graphql-request";
import axios from "axios";
import { ALL_SUBGRAPH_URL } from "../constants/subgraphs";
import { UserERC721Nfts, NFTCardProps } from "../typings";
import { GetMetadata } from "./get-metadata";

export const getUserERC721Nfts = async (owner: string, chainId: number) => {
  try {
    let data: UserERC721Nfts[];

    const res = await request(
      ALL_SUBGRAPH_URL[chainId],
      gql`
        query getUserERC721Nfts($account: ID!) {
          account(id: $account) {
            erc721nfts {
              tokenId
              metadataURL
              nftContract {
                id
                name
              }
            }
          }
        }
      `,
      { account: owner.toLowerCase() }
    );

    if (res) {
      data = res.account.erc721nfts;
    }

    const decoded = await Promise.allSettled(
      data.map((erc721) => GetMetadata.decodeTokenURI(erc721.metadataURL))
    );

    const metadata = [];

    data.map((erc721, index) => {
      const { status, ...rest } = decoded[index];
      if (status === "fulfilled") {
        metadata.push({
          token_id: erc721.tokenId,
          collection_address: erc721.nftContract.id,
          collection_name: erc721.nftContract.name,
          blockchain: chainId.toString(),
          owner,
          ...rest,
        });
      }
    });

    return metadata as NFTCardProps[];
  } catch (error) {
    console.error("Request failed ", +error);
    return [];
  }
};

export const getCollectionsApi = async () => {
  const data = await axios.get("/api/collections");
  return data;
};

export const getUserERC721Contract = async (
  chainId: number,
  contractAddress: string
) => {
  const res = await request(
    ALL_SUBGRAPH_URL[chainId],
    gql`
      query getUserERC721Contract($contractAddress: ID!) {
        erc721NftContract(id: $contractAddress) {
          id
          name
          totalNfts
          nfts {
            tokenId
            metadataURL
            owner {
              id
            }
          }
        }
      }
    `,
    { contractAddress: contractAddress.toLowerCase() }
  );

  return res;
};

export const getUserNftContract = async (
  chainId: number,
  contractAddress: string,
  withNfts?: boolean
) => {
  let res: {
    address: string;
    name?: string;
    symbol?: string;
    contract_standard: string;
    totalNfts?: string;
    nfts?: { tokenId: string; metadataURL: string; owner?: { id: string } }[];
  } | null = null;
  const erc721 = await request(
    ALL_SUBGRAPH_URL[chainId],
    gql`
      query getUserERC721Contract($contractAddress: ID!) {
        erc721NftContract(id: $contractAddress) {
          id
          name
          symbol
          totalNfts
          ${
            withNfts
              ? `nfts {
                  tokenId
                  metadataURL
                }`
              : ""
          }
        }
      }
    `,
    { contractAddress: contractAddress.toLowerCase() }
  );

  if (erc721.erc721NftContract) {
    res = {
      address: erc721.erc721NftContract.id,
      name: erc721.erc721NftContract.name ?? "",
      symbol: erc721.erc721NftContract.symbol ?? "",
      totalNfts: erc721.erc721NftContract.totalNfts,
      contract_standard: "ERC721",
      nfts: erc721.erc721NftContract.nfts,
    };

    return res;
  } else {
    const erc1155 = await request(
      ALL_SUBGRAPH_URL[chainId],
      gql`
        query getUserERC1155Contract($contractAddress: ID!) {
          erc1155NftContract(id: $contractAddress) {
            id
            totalNfts
            ${
              withNfts
                ? `nfts(first: 100) {
                  tokenId
                  metadataURL
                }`
                : ""
            }
          }
        }
      `,
      { contractAddress: contractAddress.toLowerCase() }
    );

    if (erc1155.erc1155NftContract) {
      res = {
        address: erc1155.erc1155NftContract.id,
        name: "",
        symbol: "",
        totalNfts: erc1155.erc1155NftContract.totalNfts,
        contract_standard: "ERC1155",
        nfts: erc1155.erc1155NftContract.nfts,
      };
    }
  }

  console.log(res);

  return res;
};

export const getCollectionNfts = async (
  blockchain: string,
  collectionAddress: string
) => {
  const chainId = parseInt(blockchain);
  const data = await getUserNftContract(chainId, collectionAddress, true);

  if (!data) {
    return [];
  }

  const decoded = await Promise.allSettled(
    data.nfts.map((nft) => GetMetadata.decodeTokenURI(nft.metadataURL))
  );

  const metadata = [];

  data.nfts.map((nft, index) => {
    const { status, ...rest } = decoded[index];
    if (status === "fulfilled") {
      metadata.push({
        token_id: nft.tokenId,
        collection_address: data.address,
        collection_name: data.name,
        blockchain: chainId.toString(),
        owner: nft.owner && nft.owner.id ? nft.owner.id : null,
        totalNfts: data.totalNfts,
        ...rest,
      });
    }
  });

  return metadata as NFTCardProps[];
};

export const getCollectionNft = async (
  blockchain: string,
  collectionAddress: string,
  tokenId: string
) => {
  const chainId = parseInt(blockchain);
  const id = `${collectionAddress}/0x${parseInt(tokenId, 16)}`;
  let nftData: {
    tokenId: string;
    metadataURL: string;
    nftContract: { totalNfts: string };
  };

  const erc721 = await request(
    ALL_SUBGRAPH_URL[chainId],
    gql`
      query getCollectionNft($id: ID!) {
        erc721Nft(id: $id) {
          tokenId
          metadataURL
          nftContract {
            totalNfts
          }
        }
      }
    `,
    { id: id.toLowerCase() }
  );

  if (erc721.erc721Nft) {
    nftData = erc721.erc721Nft;
  } else {
    const erc1155 = await request(
      ALL_SUBGRAPH_URL[chainId],
      gql`
        query getCollectionNft($id: ID!) {
          erc1155Nft(id: $id) {
            tokenId
            metadataURL
            nftContract {
              totalNfts
            }
          }
        }
      `,
      { id: id.toLowerCase() }
    );

    nftData = erc1155.erc1155Nft;
  }

  const data = await GetMetadata.decodeTokenURI(nftData.metadataURL);

  const metadata = {
    token_id: tokenId,
    collection_address: collectionAddress,
    ...data,
  };

  return metadata;
};
