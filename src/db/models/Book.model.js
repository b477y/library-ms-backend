import mongoose, { Schema, Types, model } from "mongoose";

const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: Types.ObjectId,
      ref: "User",
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      required: true,
    },
    availableCopies: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

export const bookModel = mongoose.models.Book || model("Book", bookSchema);
