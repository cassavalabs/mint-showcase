import { TokenMetaData, withSessionRoute } from "@cassavaland/sdk";
import { NextApiHandler } from "next";
import { AssetCollectionModel, AssetModel } from "../../../../models";

type Payload = TokenMetaData & {
  asset_contract: string;
  token_id: string;
  metadata_url: string;
};

const handler: NextApiHandler = async (req, res) => {
  const { method } = req;

  const payload: Payload = req.body;

  if (method !== "POST") {
    return res.status(405).send({ error: `Method ${method} is not Allowed` });
  }

  try {
    const chainId = req.query.blockchain_id as string;
    const assetCollectionModel = await AssetCollectionModel();
    const collection = await assetCollectionModel.findOne({
      blockchain: chainId,
      address: payload.asset_contract,
    });

    const assetModel = await AssetModel();

    await assetModel.findOneAndUpdate(
      {
        asset_collection: collection._id,
        token_id: payload.token_id,
      },
      {
        token_id: payload.token_id,
        image_uri: payload.image,
        name: payload.name,
        description: payload.description,
        external_link: payload.external_url,
        date_minted: Date.now(),
        metadata_url: payload.metadata_url,
      },
      { upsert: true, new: true }
    );

    return res.status(200).send({
      ok: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export default withSessionRoute(handler);
