import mongoose, { Schema, Types, model } from "mongoose";

const librarySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    books: {
      type: [{ type: Types.ObjectId, ref: "Book" }],
    },
  },
  { timestamps: true }
);

export const libraryModel =
  mongoose.models.Library || model("Library", librarySchema);
