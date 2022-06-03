import { gql, request } from "graphql-request";
import axios from "axios";
import { ALL_SUBGRAPH_URL } from "../constants/subgraphs";
import { UserERC721Nfts } from "../typings";
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
          ...rest,
        });
      }
    });

    return metadata;
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
  contractAddress: string
) => {
  let res: {
    address: string;
    name?: string;
    symbol?: string;
    contract_standard: string;
  };
  const erc721 = await request(
    ALL_SUBGRAPH_URL[chainId],
    gql`
      query getUserERC721Contract($contractAddress: ID!) {
        erc721NftContract(id: $contractAddress) {
          id
          name
          symbol
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
      contract_standard: "ERC721",
    };

    return res;
  } else {
    const erc1155 = await request(
      ALL_SUBGRAPH_URL[chainId],
      gql`
        query getUserERC721Contract($contractAddress: ID!) {
          erc1155NftContract(id: $contractAddress) {
            id
          }
        }
      `,
      { contractAddress: contractAddress.toLowerCase() }
    );

    res = {
      address: erc1155.erc1155NftContract.id,
      name: "",
      symbol: "",
      contract_standard: "ERC1155",
    };
  }

  return res;
};
