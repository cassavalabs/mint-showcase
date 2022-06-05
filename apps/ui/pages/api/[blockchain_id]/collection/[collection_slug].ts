import { NextApiHandler } from "next";
import { isAddress, AssetCollection } from "@cassavaland/sdk";
import { AssetCollectionModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  if (method !== "GET") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  const blockchain_id = req.query.blockchain_id as string;
  const collection_slug = req.query.collection_slug as string;

  const query: any = { blockchain: blockchain_id };
  const assetCollectionModel = await AssetCollectionModel();

  try {
    if (isAddress(collection_slug)) {
      query.address = collection_slug;
    } else {
      query.slug = collection_slug;
    }

    const collection: AssetCollection = await assetCollectionModel
      .findOne(query, { _id: 0, __v: 0 })
      .populate({
        path: "owner",
        select: " -_id -__v",
      })
      .lean();

    res.status(200).send(collection);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
