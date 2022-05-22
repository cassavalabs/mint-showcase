import { NextApiHandler } from "next";
import { AddCollectionPayload } from "@cassavaland/sdk";
import { AccountModel, AssetCollectionModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(403).send({ error: "Only POST method allowed" });
  }
  const { blockchain_id } = req.query;
  const { owner, collection: assetCollection }: AddCollectionPayload = req.body;

  //TODO: add validation

  try {
    const accountModel = await AccountModel();
    const account = await accountModel.findOneAndUpdate(
      {
        address: owner.address,
      },
      { ...owner },
      { new: true, upsert: true }
    );

    const assetCollectionModel = await AssetCollectionModel();
    await assetCollectionModel.findOneAndUpdate(
      {
        address: assetCollection.address,
        owner: account._id,
        blockchain: blockchain_id,
      },
      { ...assetCollection },
      {
        new: true,
        upsert: true,
      }
    );

    res.status(200).send({ success: "Collection added successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
};

export default handler;
