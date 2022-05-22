import { NextApiHandler } from "next";
import { isAddress, GetMetadata } from "@cassavaland/sdk";
import {
  AssetCollectionModel,
  AssetModel,
  TraitModel,
  AccountModel,
} from "../../../../../models";

const handler: NextApiHandler = async (req, res) => {
  const { asset_contract_address, token_id, blockchain_id } = req.query;

  const collectionAddress = (asset_contract_address as string).toLowerCase();
  const tokenId = token_id as string;
  const chainId = blockchain_id as string;

  if (
    !collectionAddress ||
    !isAddress(collectionAddress) ||
    !token_id ||
    !chainId
  ) {
    return res.status(400).send({
      error: "Invalid collection address, tokenId or chainId provided",
    });
  }

  try {
    //Check if collection is indexed in db
    const collectionModel = await AssetCollectionModel();
    const collection = await collectionModel
      .findOne({ address: collectionAddress })
      .exec();

    if (!collection) {
      return res.status(404).send({ error: "Asset Collection not found!" });
    }

    const assetModel = await AssetModel();
    const asset = await assetModel
      .findOne({ asset_collection: collection, token_id: tokenId })
      .populate(["asset_collections", "accounts", "traits"])
      .exec();

    if (!asset) {
      const getMetaData = new GetMetadata(collectionAddress, parseInt(chainId));
      const { uri } = await getMetaData.getTokenURI(tokenId);

      if (!uri) {
        return res
          .status(404)
          .send({ error: "Could not decode the asset tokenURI" });
      }

      const data = await GetMetadata.decodeTokenURI(uri);

      if (!data) {
        return res.status(400).send({ error: "Error decoding metadata" });
      }

      const owner = await getMetaData.getOwner(tokenId);

      if (!owner) {
        res
          .status(400)
          .send({ error: `Could not decode owner of tokenId ${tokenId} NFT` });
      }

      const accountModel = await AccountModel();

      const account = await accountModel.findOneAndUpdate(
        { address: owner },
        { address: owner },
        { upsert: true, new: true }
      );

      const traitModel = await TraitModel();

      const trait = await traitModel.create({
        collection: collection._id,
        ...data.attributes,
      });

      await trait.save();

      const newAsset = await assetModel.create({
        blockchain: chainId,
        token_id: tokenId,
        image_uri: data.image,
        name: data.name,
        description: data.description,
        external_link: data.external_url,
        asset_collection: collection._id,
        owner: account._id,
        traits: trait._id,
      });

      await newAsset.save();

      return res.status(200).send(data);
    }
  } catch (error) {
    console.log(error);
  }
};

export default handler;
