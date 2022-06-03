import { NextApiHandler } from "next";
import { isAddress } from "@cassavaland/sdk";
import { AssetCollectionModel } from "../../../models/AssetCollection";

const handler: NextApiHandler = async (req, res) => {
  const slug = req.query.collection_slug as string;
  const query: any = {};

  if (isAddress(slug)) {
    query.address = slug.toLowerCase();
  } else {
    query.slug = slug.toLowerCase();
  }

  const assetCollectionModel = await AssetCollectionModel();
  const assetCollection = await assetCollectionModel
    .findOne(query)
    .populate(["account"]);

  if (!assetCollection) {
    return res.status(404).send({ error: "Collection not found" });
  }

  res.status(200).send(assetCollection);
};

export default handler;
