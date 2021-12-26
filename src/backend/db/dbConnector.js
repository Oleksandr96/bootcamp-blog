const mongoose = require("mongoose");
const conf = require("../config/conf");

module.exports = () => {
  mongoose
    .connect(conf.mongoURI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log(error));
};
