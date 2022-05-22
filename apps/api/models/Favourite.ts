import { Schema } from "mongoose";
import type { Favourite } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

const schema = new Schema<Favourite>(
  {
    account_id: { type: Schema.Types.ObjectId, ref: "Account" },
    asset_id: { type: Schema.Types.ObjectId, ref: "Asset" },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "favourites",
  }
);

export const FavouriteModel = async () => {
  const db = await getConnection();
  return db.model<Favourite>("Favourite", schema);
};
