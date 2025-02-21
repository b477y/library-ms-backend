import mongoose, { Schema, Types, model } from "mongoose";

const borrowedBookSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: Types.ObjectId,
      ref: "Book",
      required: true,
    },
    borrowedAt: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      required: true,
    },
    returned: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export const borrowedBookModel =
  mongoose.models.BorrowedBook || model("BorrowedBook", borrowedBookSchema);
