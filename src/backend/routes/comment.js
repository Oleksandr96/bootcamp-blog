const express = require("express");
const controller = require("../controllers/comment");

const router = express.Router();

router.post("/", controller.create);
router.get("/:id", controller.getByPostId);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
