import { NextApiHandler } from "next";
import get from "lodash/get";
import { isAddress, Asset } from "@cassavaland/sdk";
import { AssetModel, AssetCollectionModel } from "../../../../models";

const handler: NextApiHandler = async (req, res) => {
  let data = {};
  const traitsCount: { [key: string]: { [key: string]: number } } = {};
  const { blockchain, collection_slug, asset_contract_address, limit, offset } =
    req.query;

  const query = {};

  if (blockchain) {
    query["blockchain"] = blockchain as string;
  }

  if (collection_slug) {
    query["slug"] = collection_slug as string;
  }

  if (asset_contract_address && isAddress(asset_contract_address as string)) {
    query["address"] = (asset_contract_address as string).toLowerCase();
  }

  const collectionModel = await AssetCollectionModel();
  const collection = await collectionModel.findOne(query).exec();

  if (!collection) {
    return res.status(404).send({ error: "Asset collection not found" });
  }

  const assetModel = await AssetModel();
  const assets = await assetModel.paginate(
    { asset_collection: collection },
    {
      offset: offset ? parseInt(offset as string, 10) : 1,
      limit: limit ? parseInt(limit as string, 10) : 30000,
      sort: { token_id: "asc" },
      populate: ["accounts", "asset_collections", "traits"],
      collation: { locale: "en_US", numericOrdering: true },
    }
  );

  assets.docs.forEach((asset: Asset) => {
    data = {
      ...data,
      [asset.token_id]: {
        ...asset,
      },
    };

    //Get trait counts
    asset.traits.forEach((trait) => {
      const traitType = trait.trait_type;
      const traitValue = trait.value;

      if (!get(traitsCount, traitType)) {
        traitsCount[traitType] = {};
      }
      if (!get(traitsCount, [traitType, traitValue])) {
        traitsCount[traitType][traitValue] = 0;
      }

      traitsCount[traitType][traitValue] += 1;
    });
  });

  const totalAssets = Object.keys(data).length;
  if (totalAssets === 0) {
    res.status(404).send({ error: "No collection assets found" });
  }
  res.status(200).send({ traitsCount, totalAssets, data });

  res.status(400).send({ error: "No collection found" });
};

export default handler;
