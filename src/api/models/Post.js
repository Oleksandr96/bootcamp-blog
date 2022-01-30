const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  isDraft: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  shortDescription: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  tags: [
    {
      ref: "Tag",
      type: Schema.Types.ObjectId,
    },
  ],
  likesCount: {
    type: Number,
    default: 0,
  },
  likedBy: [
    {
      ref: "User",
      type: Schema.Types.ObjectId,
    },
  ],
});
module.exports = mongoose.model("Post", postSchema, "posts");
