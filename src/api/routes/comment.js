const express = require("express");
const controller = require("../controllers/comment");
const passport = require("passport");

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.create
);
router.get("/:id", controller.getByPostId);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  controller.getNotApproved
);

router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.update
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  controller.remove
);

router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
