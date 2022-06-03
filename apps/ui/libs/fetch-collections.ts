import { AssetCollection, isAddress } from "@cassavaland/sdk";
import { AssetCollectionModel, AccountModel } from "../models";

export const fetchCollections = async (username?: string) => {
  let collections: AssetCollection[];
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

export const fetchCollection = async (username: string) => {
  let collection: AssetCollection;
  const assetCollectionModel = await AssetCollectionModel();

  if (isAddress(username)) {
    collection = await assetCollectionModel
      .findOne({ address: username.toLowerCase() })
      .lean();
  } else {
    collection = await assetCollectionModel
      .findOne({ slug: username.toLowerCase() })
      .lean();
  }

  return collection;
};
