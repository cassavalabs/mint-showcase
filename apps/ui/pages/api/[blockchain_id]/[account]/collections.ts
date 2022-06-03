import { NextApiHandler } from "next";
import { AssetCollection } from "@cassavaland/sdk";
import { AccountModel, AssetCollectionModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  if (req.method !== "GET") {
    return res
      .status(405)
      .send({ error: `Method ${req.method} is not Allowed` });
  }

  // const chainId = req.query.blockchain_id as string;
  const username = req.query.account as string;

  let collections: AssetCollection[];

  try {
    const assetCollectionModel = await AssetCollectionModel();
    const accountModel = await AccountModel();

    const account = await accountModel.findOne({ address: username });
    collections = await assetCollectionModel
      .find({ owner: account._id }, { _id: 0, __v: 0 })
      .populate({
        path: "owner",
        select: " -_id -__v",
      })
      .lean();

    res.status(200).send(collections);
  } catch (error) {
    console.log(error);
  }
};

export default handler;
