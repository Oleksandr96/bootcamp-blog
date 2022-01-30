const express = require("express");
const passport = require("passport");
const bodyParser = require("body-parser");
const conf = require("./config/conf");
const path = require("path");
const cors = require("cors");

const connectDb = require("./db/dbConnector");

const userRoutes = require("./routes/user");
const postsRoutes = require("./routes/post");
const tagsRoutes = require("./routes/tag");
const commentsRoutes = require("./routes/comment");

const port = conf.port;
const app = express();

class Server {
  constructor() {
    this.initDB();
    this.initExpressMiddlewares();
    this.initRoutes();
    this.start();
  }

  start() {
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  initExpressMiddlewares() {
    app.use(passport.initialize());
    require("./middleware/passport")(passport);
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
  }

  initRoutes() {
    app.use("/api/v1/posts", postsRoutes);
    app.use("/api/v1/tags", tagsRoutes);
    app.use("/api/v1/user", userRoutes);
    app.use("/api/v1/comments", commentsRoutes);

    app.use("/uploads", express.static("uploads"));

    app.use(express.static("../../dist/bootcamp-blog"));
    app.all("*", (req, res) => {
      res.sendFile(path.join(__dirname, "../../dist/bootcamp-blog/index.html"));
    });
  }

  initDB() {
    connectDb().then(() => console.log("DB ready"));
  }
}

new Server();
