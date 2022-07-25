import { Schema } from "mongoose";
import type { Asset } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

/**
 * Create Schema and Model to store asset
 */

type AssetSchema = Omit<Asset, "asset_collection"> & {
  asset_collection: Schema.Types.ObjectId;
  // traits: Schema.Types.ObjectId[];
};

const schema = new Schema<AssetSchema>(
  {
    token_id: { type: String, required: true },
    image_uri: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: false, default: null },
    external_link: { type: String, required: false, default: null },
    metadata_url: { type: String, required: true },
    date_minted: { type: Date, required: false, default: null },
    asset_collection: { type: Schema.Types.ObjectId, ref: "AssetCollection" },
    // traits: [{ type: Schema.Types.ObjectId, ref: "Trait" }],
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "assets",
  }
);

export const AssetModel = async () => {
  const db = await getConnection();
  return db.model<AssetSchema>("Asset", schema);
};
