import { Schema } from "mongoose";
import type { Trait } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

const schema = new Schema<Trait>(
  {
    asset_collection: { type: Schema.Types.ObjectId, ref: "AssetCollection" },
    trait_type: { type: String, required: true },
    value: { type: String, required: true },
    display_type: { type: String, required: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "traits",
  }
);

export const TraitModel = async () => {
  const db = await getConnection();
  return db.model<Trait>("Trait", schema);
};
