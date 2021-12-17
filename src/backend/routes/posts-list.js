const express = require("express");
const controller = require("../controllers/auth");

const router = express.Router();

router.post("/posts", controller.getAll);

module.exports = router;
