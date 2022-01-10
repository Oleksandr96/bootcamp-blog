const errorHandler = require("../utils/errorHandler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const conf = require("../config/conf");
const UserModel = require("../models/User");

module.exports.login = async (req, res) => {
  try {
    const candidate = await UserModel.findOne({ email: req.body.email });
    if (candidate) {
      const passwordResult = bcrypt.compareSync(
        req.body.password,
        candidate.password
      );
      console.log(passwordResult);
      if (passwordResult) {
        const token = jwt.sign(
          {
            email: candidate.email,
            userId: candidate._id,
          },
          conf.jwt,
          { expiresIn: 60 * 60 }
        );
        res.status(200).json({
          token: `Bearer ${token}`,
        });
        res.status(200).json({
          message: `Welcome, user: ${candidate._id}`,
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
      res.status(201).send(user);
    }
  } catch (e) {
    errorHandler(res, e);
  }
};

module.exports.update = async (req, res) => {
  try {
    const { firstName, lastName, bio, email, password } = req.params;
    const salt = bcrypt.genSaltSync(10);
    const user = await UserModel.findByIdAndUpdate(
      { _id: req.params.id },
      {
        firstName,
        lastName,
        bio,
        email,
        password: bcrypt.hashSync(password, salt),
        avatarSrc: req.file ? req.file.path : "",
      },
      { new: true }
    );
    res.status(200).send(user);
  } catch (e) {
    errorHandler(res, e);
  }
};
