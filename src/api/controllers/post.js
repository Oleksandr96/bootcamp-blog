const errorHandler = require("../utils/errorHandler");

const PostModel = require("../models/Post");
const UserModel = require("../models/User");
const TagModel = require("../models/Tag");
const mongoose = require("mongoose");

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
    console.log(req.body);
    const { title, content, shortDescription, tags, isDraft } = req.body;
    await PostModel.create({
      title,
      content,
      shortDescription,
      tags,
      isDraft,
      user: req.user._id,
    });
    res.status(200).json({
      message: isDraft
        ? "Success! Your post saved as draft"
        : "Success! Your post published",
    });
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
    await PostModel.findOneAndRemove({
      _id: req.params.id,
    });

    res.status(200).json({ message: "Post removed." });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const userId = req.user._id;
    const { title, shortDescription, content, tags, isDraft } = req.body;
    console.log(req.body);
    console.log(req.params.id);

    await PostModel.findByIdAndUpdate(
      { _id: req.params.id, user: userId },
      {
        title,
        shortDescription,
        content,
        tags,
        isDraft,
      }
    );
    res.status(200).json({ message: "Post updated" });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.like = async (req, res) => {
  try {
    const post = await PostModel.findById(
      { _id: req.body.id },
      { likedBy: 1, likesCount: 1 }
    );
    const userId = req.user.id;
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

module.exports.getLikedPosts = async (req, res) => {
  try {
    const posts = await PostModel.aggregate([
      {
        $match: {
          likedBy: { $in: [req.user._id, "$likedBy"] },
        },
      },
      {
        $project: {
          title: 1,
        },
      },
    ]);
    res.status(200).send(posts);
  } catch (e) {
    errorHandler(res, e);
  }
};
