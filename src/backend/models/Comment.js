const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  postId: {
    ref: "Post",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
