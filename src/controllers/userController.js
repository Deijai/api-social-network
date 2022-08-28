"use strict";
const User = require("../models/User");
const bcrypt = require("bcrypt-nodejs");
const jwt = require("../helpers/jwt");

const test = (req, res) => {
  res.json({ ok: true });
};

//save user
const save = async (req, res) => {
  const { user } = req.body;

  try {
    if (
      user.name &&
      user.surname &&
      user.email &&
      user.password &&
      user.nick &&
      user.role
    ) {
      const data = new User(user);

      const userExists = await User.findOne({
        $or: [{ email: user.email }, { nick: user.nick }],
      });

      if (userExists) {
        return res
          .status(500)
          .json({ error: "There is already a user with that email, check" });
      }

      bcrypt.hash(user.password, null, null, (err, hash) => {
        data.password = hash;
        data.save((err, userStored) => {
          console.log("userStored", userStored);
          if (err) {
            return res.status(500).json({ error: err });
          }

          if (userStored) {
            return res.status(200).json({ user: userStored });
          } else {
            return res.status(404).json({ error: "User not created" });
          }
        });
      });
    }
  } catch (error) {
    return res.status(401).json({ error: error });
  }
};

//signin user
const signin = async (req, res) => {
  const { user } = req.body;
  const userExists = await User.findOne({ email: user.email });

  if (!userExists) {
    return res
      .status(404)
      .json({ error: "Email and/or Password are incorrect" });
  }

  bcrypt.compare(user.password, userExists.password, (err, user) => {
    if (err) {
      return res.status(404).json({ error: err });
    }

    if (!user) {
      return res
        .status(404)
        .json({ error: "Email and/or Password are incorrect" });
    }

    userExists.password = null;
    const tokenUser = jwt.createToken(userExists);

    return res.status(200).json({
      user: userExists,
      token: tokenUser,
    });
  });
};

//list all user
const getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const users = await User.find()
      .sort("_id")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    if (users.length <= 0) {
      return res.status(404).json({ error: "No users found" });
    }
    return res.status(200).json({ users: users });
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

//list user by id
const getUser = async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(404).json({ error: "UserId does not exist" });
  }

  try {
    const userExists = await User.findById({ _id: userId });

    if (!userExists) {
      return res.status(404).json({ error: "User does not exist" });
    }

    return res.status(200).json({ user: userExists });

    console.log("userExists: ", userExists);
  } catch (error) {
    return res.status(404).json({ error: error });
  }
};

module.exports = {
  test,
  save,
  signin,
  getUser,
  getUsers,
};
