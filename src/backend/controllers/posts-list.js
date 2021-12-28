const errorHandler = require("../utils/errorHandler");

const PostModel = require("../models/Post");
const UserModel = require("../models/User");

module.exports.getAll = async (req, res) => {
  try {
    const posts = await PostModel.find({}).sort({ date: -1 }).populate("user");

    if (!posts) {
      return res.status(404).json({ message: "Posts not found" });
    }

    res.status(200).json(posts);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.create = async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await PostModel.create({
      title,
      content,
      user: "61cb1a097c1998f0505fea29",
      likes: 0,
    });

    res.status(200).json(post);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id).populate("user");
    res.status(200).send(post);
  } catch (e) {
    errorHandler(res, e);
  }
};
