import { NextApiHandler } from "next";
import { AssetCollectionModel, AssetModel } from "../../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const blockchain_id = req.query.blockchain_id as string;
  const collection = req.query.collection as string;
  const token_id = req.query.token_id as string;

  try {
    const assetCollectionModel = await AssetCollectionModel();
    const assetCollection = await assetCollectionModel.findOne({
      address: collection.toLowerCase(),
      blockchain: blockchain_id,
    });

    const assetModel = await AssetModel();
    const asset = await assetModel
      .findOne({ asset_collection: assetCollection._id, token_id: token_id })
      .select("-asset_collection -_id")
      .lean();

    res.status(200).send(asset);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
