import mongoose, { model, Schema, Types } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    borrowedBooks: {
      type: [{ type: Types.ObjectId, ref: "Book" }],
    },
    deletedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

export const userModel = mongoose.models.User || model("User", userSchema);
