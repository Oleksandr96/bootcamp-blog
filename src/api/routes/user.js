const express = require("express");
const passport = require("passport");

const upload = require("../middleware/upload");
const controller = require("../controllers/user");

const router = express.Router();

router.post("/register", controller.register);
router.post("/login", controller.login);
router.patch(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  upload.single("image"),
  controller.update
);
router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  controller.getAll
);
router.get(
  "",
  passport.authenticate("jwt", { session: false }),
  controller.getById
);
router.get("*", (req, res) => {
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
