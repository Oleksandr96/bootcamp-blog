const mongoose = require("mongoose");
const env = require("../config/env");

module.exports = async () => {
  try {
    await mongoose.connect(env.mongoURI);
  } catch (err) {
    console.error(err);
  }
};
