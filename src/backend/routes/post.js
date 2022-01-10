const express = require("express");
const controller = require("../controllers/post");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.patch("/:id", controller.update);
router.get("/:id", controller.getById);
router.delete("/:id", controller.remove);

router.patch("/like/:id", controller.like);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
