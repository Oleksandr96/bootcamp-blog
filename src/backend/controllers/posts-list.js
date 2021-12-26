const postsData = require("../data/posts-data.json");
const errorHandler = require("../utils/errorHandler");

const Post = require("../models/Post");

module.exports.getAll = async (req, res) => {
  try {
    res.status(200).send(postsData);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const post = await new Post({
      title: req.body.title,
      content: req.body.content,
    }).save();

    res.status(200).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};
