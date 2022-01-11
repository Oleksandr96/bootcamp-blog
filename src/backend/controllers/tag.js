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
module.exports.getById = async (req, res) => {
  try {
    const tags = await TagModel.findById({ _id: req.params.id });
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

module.exports.getPopular = async (req, res) => {
  try {
    const tags = await PostModel.aggregate([
      {
        $unwind: "$tags",
      },
      {
        $group: {
          _id: "$tags",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "tags",
          localField: "_id",
          foreignField: "_id",
          as: "tag",
        },
      },
      {
        $project: { _id: 1, name: { $first: "$tag.name" }, count: 1 },
      },
      { $sort: { count: -1 } },
      { $limit: 10 },
    ]);
    res.status(200).send(tags);
  } catch (e) {
    errorHandler(res, e);
  }
};
