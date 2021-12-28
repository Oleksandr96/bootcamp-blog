const express = require("express");
const path = require("path");
const port = 3000;

const app = express();

const postsRoutes = require("./routes/posts-list");

app.use(express.static("../../dist/bootcamp-blog"));
app.use("/api", postsRoutes);
app.all("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/bootcamp-blog/index.html"));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
