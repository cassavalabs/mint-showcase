import { NextApiHandler } from "next";
import { AssetCollectionModel, AssetModel } from "../../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  const blockchain_id = req.query.blockchain_id as string;
  const collection = req.query.collection as string;

  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  try {
    const assetCollectionModel = await AssetCollectionModel();
    const assetCollection = await assetCollectionModel.findOne({
      address: collection.toLowerCase(),
      blockchain: blockchain_id,
    });

    const assetModel = await AssetModel();
    const assets = await assetModel
      .find({
        asset_collection: assetCollection._id,
      })
      .select("-_id name token_id image_uri")
      .lean();

    const resp = [];

    assets.map((asset) => {
      resp.push({
        collection_name: assetCollection.name,
        collection_address: assetCollection.address,
        description: assetCollection.description,
        blockchain: blockchain_id,
        ...asset,
      });
    });

    res.status(200).send({
      // collection_name: assetCollection.name,
      // collection_address: assetCollection.address,
      // description: assetCollection.description,
      // blockchain: blockchain_id,
      assets: resp,
    });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .send({ error: "Unable to handle your request at the moment" });
  }
};

export default handler;
