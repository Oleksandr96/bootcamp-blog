const errorHandler = require("../utils/errorHandler");

const CommentModel = require("../models/Post");

module.exports.create = async (req, res) => {
  try {
    const { content, postId } = req.body;
    const token = JSON.parse(atob(req.headers.authorization.split(".")[1]));
    const userId = token.userId;
    const comment = await CommentModel.create({
      postId,
      content,
      user: userId,
    });
    res.status(200).json(comment);
  } catch (e) {
    errorHandler(res, e);
  }
};
module.exports.getByPostId = async (req, res) => {
  try {
    let comments = await CommentModel.find({
      postId: req.params.postId,
    }).populate("user");

    if (!comments) {
      return res
        .status(404)
        .json({ message: "Comments not found for this post" });
    }
    res.status(200).json(comments);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { content } = req.body;
    const token = JSON.parse(atob(req.headers.authorization.split(".")[1]));
    const userId = token.userId;
    const comment = await CommentModel.updateOne(
      { _id: req.body.id, user: userId },
      {
        content,
        edited: true,
      }
    );
    res.status(200).json(comment);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    await CommentModel.findOneAndDelete({ id: req.params.id });
    res.status(200).json({ message: "Comment deleted." });
  } catch (e) {
    errorHandler(res, e);
  }
};
