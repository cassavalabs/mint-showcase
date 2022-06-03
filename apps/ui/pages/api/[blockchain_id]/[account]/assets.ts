import { NextApiHandler } from "next";
import {
  isAddress,
  getUserERC721Nfts,
  ALL_SUPPORTED_CHAIN_IDS,
} from "@cassavaland/sdk";

const handler: NextApiHandler = async (req, res) => {
  const chainId = req.query.blockchain_id as string;
  const account = req.query.account as string;

  if (!ALL_SUPPORTED_CHAIN_IDS.includes(parseInt(chainId))) {
    return res
      .status(400)
      .send({ error: "You have provided an unsupported blockchain ID" });
  }

  if (!isAddress(account)) {
    return res
      .status(400)
      .send({ error: "You have provided an invalid wallet address" });
  }

  const resp = await getUserERC721Nfts(account, parseInt(chainId));

  res.status(200).send(resp);
};

export default handler;
