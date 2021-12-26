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
    ref: "users",
    type: Schema.Types.ObjectId,
  },
  category: {
    ref: "categories",
    type: Schema.Types.ObjectId,
  },
  tags: {
    ref: "tags",
    type: Schema.Types.ObjectId,
  },
  likes: [String],
});
module.exports = mongoose.model("posts", postSchema);
