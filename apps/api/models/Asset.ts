import { PaginateModel, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import type { Asset } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

const schema = new Schema<Asset>(
  {
    blockchain: { type: String, required: true },
    token_id: { type: String, required: true },
    image_uri: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false },
    external_link: { type: String, required: false },
    date_minted: { type: String, required: false },
    asset_collection: { type: Schema.Types.ObjectId, ref: "AssetCollection" },
    traits: { type: Schema.Types.ObjectId, ref: "Trait" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "assets",
  }
).plugin(mongoosePaginate);

export const AssetModel = async () => {
  const db = await getConnection();
  return db.model<Asset, PaginateModel<Asset>>("Asset", schema);
};
