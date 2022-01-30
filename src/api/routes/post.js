const express = require("express");
const controller = require("../controllers/post");
const passport = require("passport");

const router = express.Router();
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.get("/", controller.getAll);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
router.get("/:id", controller.getById);
router.get(
  "/liked/:userId",
  passport.authenticate("jwt", { session: false }),
  controller.getLikedPosts
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.remove
);
router.patch(
  "/like/:id",
  passport.authenticate("jwt", { session: false }),
  controller.like
);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
