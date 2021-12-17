const postsData = require("../data/posts-data.json");

module.exports.getAll = async (req, res) => {
  res.status(200).send(postsData);
};
