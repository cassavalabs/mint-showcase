import { NextApiHandler } from "next";
import {
  isAddress,
  getUserERC721Nfts,
  ALL_SUPPORTED_CHAIN_IDS,
  NFTCardProps,
} from "@cassavaland/sdk";

const handler: NextApiHandler = async (req, res) => {
  const chainId = req.query.blockchain_id as string;
  const account = req.query.account as string;

  if (!isAddress(account)) {
    return res
      .status(400)
      .send({ error: "You have provided an invalid wallet address" });
  }

  let resp: NFTCardProps[] = [];

  if (chainId === "all") {
    ALL_SUPPORTED_CHAIN_IDS.map(async (blockchainId) => {
      const data = await getUserERC721Nfts(account, blockchainId);
      resp.push(...data);
    });
  } else {
    if (!ALL_SUPPORTED_CHAIN_IDS.includes(parseInt(chainId))) {
      return res
        .status(400)
        .send({ error: "You have provided an unsupported blockchain ID" });
    }
    resp = await getUserERC721Nfts(account, parseInt(chainId));
  }

  res.status(200).send(resp);
};

export default handler;
