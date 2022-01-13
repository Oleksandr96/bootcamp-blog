const errorHandler = require("../utils/errorHandler");

const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const TagModel = require("../models/Tag");

module.exports.getAll = async (req, res) => {
  try {
    const { offset, limit, author, tag } = req.query;
    const ObjectId = require("mongoose").Types.ObjectId;

    let query = {};

    if (author) {
      query.user = new ObjectId(author);
    }
    if (tag) {
      query.tags = new ObjectId(tag);
    }
    const posts = await PostModel.find(query, {
      tags: 0,
      likedBy: 0,
      content: 0,
    })
      .populate({
        path: "user",
        select: ["firstName", "lastName", "avatarSrc"],
      })
      .sort({ date: -1 })
      .skip(+offset)
      .limit(+limit);

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).send(posts);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { title, content, shortDescription } = req.body;
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    token = JSON.parse(atob(token.split(".")[1]));
    const userId = token.userId;

    const post = await PostModel.create({
      title,
      content,
      shortDescription,
      user: userId,
      tags: "61d54c47c5ad2458e3e0526a",
    });

    res.status(200).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate([
      { path: "tags", select: "name" },
      { path: "user", select: ["firstName", "lastName"] },
    ]);
    res.status(200).send(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.remove = async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    token = JSON.parse(atob(token.split(".")[1]));
    const userId = token.userId;

    await PostModel.remove({ _id: req.params.id, user: userId });
    res.status(200).json({ message: "Post removed." });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    token = JSON.parse(atob(token.split(".")[1]));
    const userId = token.userId;

    const post = await PostModel.findByIdAndUpdate(
      { _id: req.params.id, user: userId },
      {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
      }
    );
    res.status(200).send(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.like = async (req, res) => {
  try {
    let token = req.headers.authorization;
    if (!token) return res.status(401).json({ message: "Unauthorized" });

    token = JSON.parse(atob(token.split(".")[1]));
    const userId = token.userId;

    const post = await PostModel.findById(
      { _id: req.body.id },
      { likedBy: 1, likesCount: 1 }
    );
    const isLiked = post.likedBy.indexOf(userId);
    let likesData = {};

    if (isLiked > -1) {
      likesData = {
        likesCount: post.likesCount - 1,
        $pull: { likedBy: userId },
      };
    } else {
      likesData = {
        likesCount: post.likesCount + 1,
        $push: { likedBy: userId },
      };
    }
    const updatedPost = await PostModel.findOneAndUpdate(
      { _id: req.body.id },
      likesData,
      { new: true }
    ).populate({
      path: "user",
      select: ["firstName", "lastName", "avatarSrc"],
    });

    return res.status(200).send(updatedPost);
  } catch (e) {
    errorHandler(res, e);
  }
};
