const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  content: {
    type: String,
    required: true,
  },
  user: {
    ref: "User",
    type: Schema.Types.ObjectId,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  postId: {
    ref: "Post",
    type: Schema.Types.ObjectId,
  },
});

module.exports = mongoose.model("Comment", commentSchema, "comments");
