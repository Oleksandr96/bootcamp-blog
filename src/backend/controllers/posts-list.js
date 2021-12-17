const postsData = require("../data/posts-data.json");
const errorHandler = require("../utils/errorHandler");

module.exports.getAll = async (req, res) => {
  try {
    res.status(200).send(postsData);
  } catch (e) {
    errorHandler(res, e);
  }
};
