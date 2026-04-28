import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const assetRequestSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    referenceImageUrl: { type: String, default: "" },
    status: {
      type: String,
      enum: ["pending", "in_progress", "completed"],
      default: "pending",
    },
  },
  { timestamps: true },
);

export type AssetRequestDocument = InferSchemaType<typeof assetRequestSchema> & {
  _id: string;
};

const AssetRequest =
  (models.AssetRequest as Model<AssetRequestDocument>) ||
  model("AssetRequest", assetRequestSchema);

export default AssetRequest;
