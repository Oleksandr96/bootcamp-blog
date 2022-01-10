const errorHandler = require("../utils/errorHandler");

const TagModel = require("../models/Tag");
const PostModel = require("../models/Post");
//done
module.exports.create = async (req, res) => {
  try {
    const candidate = await TagModel.findOne({
      name: req.body.name,
    });

    if (candidate) {
      res.status(409).json({
        message: "Tag already exist.",
      });
    } else {
      console.log(req.body);
      const tag = await TagModel.create({
        name: req.body.name,
      });
      res.status(200).json(tag);
    }
  } catch (e) {
    errorHandler(res, e);
  }
};
module.exports.getAll = async (req, res) => {
  try {
    const tags = await TagModel.find();
    res.status(200).send(tags);
  } catch (e) {
    errorHandler(res, e);
  }
};
//done
module.exports.remove = async (req, res) => {
  try {
    await TagModel.deleteOne({
      _id: req.params.id,
    });

    res.status(200).json({ message: "Tag deleted" });
  } catch (e) {
    errorHandler(res, e);
  }
};
//done
module.exports.update = async (req, res) => {
  try {
    await TagModel.findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { name: req.body.name }
    );
    res.status(200).json({ message: "Tag updated" });
  } catch (e) {
    errorHandler(res, e);
  }
};
