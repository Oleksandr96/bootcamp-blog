const express = require("express");
const controller = require("../controllers/posts-list");

const router = express.Router();

router.post("/new", controller.create);
router.get("/", controller.getAll);
router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
