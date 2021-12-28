const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  content: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  tags: {
    ref: "Tag",
    type: Schema.Types.ObjectId,
  },
  likes: {
    type: Number,
    default: 0,
  },
});
module.exports = mongoose.model("Post", postSchema, "posts");
