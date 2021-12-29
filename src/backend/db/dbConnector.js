const mongoose = require("mongoose");
const conf = require("../config/conf");

module.exports = async () => {
  try {
    await mongoose.connect(conf.mongoURI);
    console.log("DB connected");
  } catch (err) {
    console.error(err);
  }
};
