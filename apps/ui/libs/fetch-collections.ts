import { CollectionCardProps, isAddress } from "@cassavaland/sdk";
import { AssetCollectionModel, AccountModel } from "../models";

export const fetchCollections = async (username?: string) => {
  let collections: CollectionCardProps[];
  const assetCollectionModel = await AssetCollectionModel();
  const accountModel = await AccountModel();

  if (username && isAddress(username)) {
    const account = await accountModel.findOne({ address: username });
    collections = await assetCollectionModel
      .find({ owner: account._id }, { _id: 0, __v: 0 })
      .populate({
        path: "owner",
        select: " -_id -__v",
      })
      .lean();
  } else {
    collections = await assetCollectionModel
      .find({}, { _id: 0, __v: 0 })
      .populate({
        path: "owner",
        select: "-_id -__v",
      })
      .lean();
  }

  return collections;
};

export const fetchCollection = async (username: string, blockchain: string) => {
  const query: any = { blockchain: blockchain };
  const assetCollectionModel = await AssetCollectionModel();

  if (isAddress(username)) {
    query.address = username.toLowerCase();
  } else {
    query.slug = username.toLowerCase();
  }

  const accountModel = await AccountModel();
  const collection: CollectionCardProps = await assetCollectionModel
    .findOne(query, { _id: 0, __v: 0 })
    .populate({
      path: "owner",
      select: "-_id -__v",
      model: accountModel,
    })
    .lean();

  return collection;
};
