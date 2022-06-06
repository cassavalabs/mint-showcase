import { NextApiHandler } from "next";
import { AssetCollection, withSessionRoute, slugify } from "@cassavaland/sdk";
import { AssetCollectionModel, AccountModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;
  const payload: {
    address: string;
    description?: string;
    owner: string;
    name?: string;
    symbol?: string;
    contract_standard: string;
  } = req.body;
  let assetCollection: AssetCollection;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  try {
    const chainId = req.query.blockchain_id as string;

    const accountModel = await AccountModel();
    let account = await accountModel
      .findOne({ address: payload.owner.toLowerCase() })
      .exec();

    if (!account) {
      account = await new accountModel({
        address: payload.owner.toLowerCase(),
        verified: false,
      }).save();
    }

    const assetCollectionModel = await AssetCollectionModel();
    assetCollection = await assetCollectionModel.findOneAndUpdate(
      {
        blockchain: chainId,
        address: payload.address.toLowerCase(),
        owner: account._id,
      },
      {
        name: payload.name,
        symbol: payload.symbol,
        slug: slugify(payload.name ?? payload.address),
        description: payload.description,
        contract_standard: payload.contract_standard,
      },
      { upsert: true, new: true }
    );

    return res.status(200).send({
      ok: true,
      contract: {
        address: assetCollection.address,
        name: assetCollection.name,
        standard: assetCollection.contract_standard,
      },
    });
  } catch (error) {
    console.log(error);
    res.send({ ok: false });
  }
};

export default withSessionRoute(handler);
