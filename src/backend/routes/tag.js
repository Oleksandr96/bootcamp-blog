const express = require("express");
const controller = require("../controllers/tag");

const router = express.Router();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.patch("/:id", controller.update);
router.delete("/:id", controller.remove);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
