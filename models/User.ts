import { InferSchemaType, Model, Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  },
);

export type UserDocument = InferSchemaType<typeof userSchema> & { _id: string };

const User = (models.User as Model<UserDocument>) || model("User", userSchema);
export default User;
