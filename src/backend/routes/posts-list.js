const express = require("express");
const controller = require("../controllers/posts-list");

const router = express.Router();

router.get("/posts", controller.getAll);
router.get("*", (req, res) => {
  res.status(404).send("404 - Not found");
});

module.exports = router;
