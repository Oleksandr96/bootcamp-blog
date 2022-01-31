if (process.env.NODE_ENV === "development") {
  module.exports = require("./env.dev");
} else {
  module.exports = require("./env.prod");
}
