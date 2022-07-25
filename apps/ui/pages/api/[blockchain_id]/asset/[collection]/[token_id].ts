import { NextApiHandler } from "next";
import { AssetModel } from "../../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const blockchain_id = req.query.blockchain_id as string;
  const collection = req.query.collection as string;
  const token_id = req.query.token_id as string;

  try {
    const assetModel = await AssetModel();
    const asset = await assetModel
      .findOne({ asset_collection: collection, token_id: token_id })
      .populate("assetCollections")
      .lean();

    res.status(200).send(asset);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
