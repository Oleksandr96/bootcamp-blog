const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conf = require("../config/env");
const UserModel = require("../models/User");

module.exports.login = async (req, res) => {
  try {
    const candidate = await UserModel.findOne({ email: req.body.email });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            isAdmin: candidate.isAdmin,
            userId: candidate._id,
          },
          conf.jwt,
          { expiresIn: 60 * 60 * 24 }
        );
        res.status(200).json({
          token: `Bearer ${token}`,
        });
      } else {
        res.status(401).json({
          message: "Incorrect password.",
        });
      }
    } else {
      res.status(404).json({
        message: "User not found. Try again.",
      });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.register = async (req, res) => {
  try {
    const candidate = await UserModel.findOne({ email: req.body.email });
    if (candidate) {
      res.status(409).json({
        message: `User with email "${req.body.email}" already exist. Try again.`,
      });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const { firstName, lastName, email, password } = req.body;
      const user = await UserModel.create({
        firstName,
        lastName,
        email,
        password: bcrypt.hashSync(password, salt),
      });
      res.status(201).json({ message: "Success!" });
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    let data = req.body;

    if (data.password) {
      const salt = bcrypt.genSaltSync(10);
      data.password = bcrypt.hashSync(data.password, salt);
    }

    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        ...data,
        avatarSrc: req.file ? req.file.path : "/uploads/user.png",
      },
      { new: true }
    );
    res.status(200).json({ message: "Updated" });
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getById = async (req, res) => {
  try {
    const user = await UserModel.findById(
      { _id: req.user.id },
      { password: 0 }
    );
    res.status(200).send(user);
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.getAll = async (req, res) => {
  try {
    if (!req.user.isAdmin) return res.status(401).send("Unauthorized");

    const users = await UserModel.find().select([
      "firstName",
      "lastName",
      "email",
      "isAdmin",
    ]);
    res.status(200).send(users);
  } catch (e) {
    errorHandler(res, e);
  }
};
