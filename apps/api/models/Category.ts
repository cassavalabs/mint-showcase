import { Schema } from "mongoose";
import { Category } from "@cassavaland/sdk";
import { getConnection } from "../libs/mongodb";

const schema = new Schema<Category>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    slug: { type: String, required: true },
    banner_image_uri: { type: String, required: true },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
    collection: "categories",
  }
);

export const CategoryModel = async () => {
  const db = await getConnection();
  return db.model<Category>("Category", schema);
};
