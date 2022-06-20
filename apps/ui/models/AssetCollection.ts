import { Schema } from "mongoose";
import { AssetCollection, slugify } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

// const socialSchema = new Schema<SocialContacts>({
//   facebook: { type: String, required: false },
//   twitter: { type: String, required: false },
//   discord: { type: String, required: false },
//   instagram: { type: String, required: false },
//   telegram: { type: String, required: false },
// });

const schema = new Schema<AssetCollection>(
  {
    blockchain: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
    symbol: { type: String, required: true },
    description: { type: String, required: false },
    slug: { type: String, unique: true },
    contract_standard: { type: String, required: true },
    external_link: { type: String, required: false },
    // social_contacts: socialSchema,
    total_supply: { type: String, required: false },
    banner_image_uri: { type: String, required: false },
    owner: { type: Schema.Types.ObjectId, ref: "Account" },
    // category: { type: Schema.Types.ObjectId, ref: "Category" },
    facebook: { type: String, required: false },
    twitter: { type: String, required: false },
    discord: { type: String, required: false },
    instagram: { type: String, required: false },
    telegram: { type: String, required: false },
    verified: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "asset_collections",
  }
);

schema.pre("save", function (next) {
  this.slug = slugify(this.name);
  next();
});

export const AssetCollectionModel = async () => {
  const db = await getConnection();
  return db.model<AssetCollection>("AssetCollection", schema);
};
