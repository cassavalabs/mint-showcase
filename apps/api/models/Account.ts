import { Schema } from "mongoose";
import type { Account } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

/**
 * Create Schema and Model to store user accounts
 */

const schema = new Schema<Account>(
  {
    address: { type: String, required: true },
    username: { type: String, required: false, default: null },
    bio: { type: String, required: false, default: null },
    email: { type: String, required: false, default: null },
    avatar_uri: { type: String, required: false, default: null },
    banner_uri: { type: String, required: false, default: null },
    twitter: { type: String, required: false, default: null },
    instagram: { type: String, required: false, default: null },
    facebook: { type: String, required: false, default: null },
    discord: { type: String, required: false, default: null },
    telegram: { type: String, required: false, default: null },
    website: { type: String, required: false, default: null },
    verified: { type: Boolean, required: false, default: false },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "accounts",
  }
);

export const AccountModel = async () => {
  const db = await getConnection();
  return db.model<Account>("Account", schema);
};
