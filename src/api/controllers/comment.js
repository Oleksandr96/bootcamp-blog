const errorHandler = require("../utils/errorHandler");

const CommentModel = require("../models/Comment");

module.exports.create = async (req, res) => {
  try {
    const { content, postId } = req.body;
    let token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: "Unauthorized" });

    token = JSON.parse(atob(token.split(".")[1]));
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
      postId: req.params.id,
      isApproved: true,
    }).populate({
      path: "user",
      select: ["firstName", "lastName", "avatarSrc"],
    });
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

module.exports.getNotApproved = async (req, res) => {
  try {
    let comments = await CommentModel.find({
      isApproved: false,
    });
    if (!comments) {
      return res.status(404).json({ message: "Comments not found" });
    }
    res.status(200).json(comments);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    //console.log(req.params);
    //console.log(req.body);

    const comment = await CommentModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...req.body,
      }
    );
    res.status(200).json(comment);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    if (req.user.isAdmin) {
      await CommentModel.findByIdAndRemove(req.params.id);
      return res.status(200).json({ message: "Comment deleted" });
    }
    return res.status(403).json({ message: "Permissions denied!" });
  } catch (e) {
    errorHandler(res, e);
  }
};
