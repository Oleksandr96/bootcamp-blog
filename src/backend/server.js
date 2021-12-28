const express = require("express");
const bodyParser = require("body-parser");
const conf = require("./config/conf");
const path = require("path");

const db = require("./db/dbConnector")();
const port = conf.port;
const app = express();

const postsRoutes = require("./routes/posts-list");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/posts", postsRoutes);

app.use(express.static("../../dist/bootcamp-blog"));
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/bootcamp-blog/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
