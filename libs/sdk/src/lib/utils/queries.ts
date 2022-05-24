import { gql, request } from "graphql-request";
import { SupportedChainId } from "../constants/chains";
import { ALL_SUBGRAPH_URL } from "../constants/subgraphs";
import { ERC721NftContract } from "../typings";

export const getUserERC721NftContractsFromSg = async ({
  owner,
  chainId,
}: {
  owner: string;
  chainId: number;
}): Promise<ERC721NftContract[]> => {
  try {
    const res = await request(
      ALL_SUBGRAPH_URL[chainId],
      gql`
        query getUserNftContracts($account: ID!) {
          erc1155Nfts(where: { owner: $account }) {
            nftContract {
              id
              name
              symbol
            }
          }
        }
      `,
      { account: owner.toLowerCase() }
    );
    console.log(res.erc721Nfts);
  } catch (error) {
    console.error("Request failed");
    return [];
  }
};
