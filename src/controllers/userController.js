import mongoose from "mongoose";
import { UserSchema } from "../models/userModel.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/jwtConfig.js";

// Mongoose Model for using MongoDB
const User = mongoose.model("user", UserSchema);

// The controllers below are to Add New Users, Get Users, Get Users with an ID, Update Users, and Delete Users
export const addNewUser = (req, res) => {
  let newUser = new User(req.body);

  newUser.save((err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const userExists = (req, res) => {
  console.log(`Checking if ${req.query.email} exists`);
  User.findOne({email: req.query.email}, (err, user) => {
    if (err) {
      res.status(500).send({userExists: false, err: err});
    }
    if (user) {
      res.json({userExists: true});
    } else {
      res.json({userExists: false});
    }
  });
};

export const getUsers = (req, res) => {
  User.find({}, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const getUserWithID = (req, res) => {
  User.findById(req.params.userID, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json(user);
  });
};

export const updateUser = (req, res) => {
  User.findOneAndUpdate(
    { _id: req.params.userID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, user) => {
      if (err) {
        res.send(err);
      }
      res.json(user);
    }
  );
};

export const deleteUser = (req, res) => {
  User.remove({ _id: req.params.userID }, (err, user) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "successfully deleted user" });
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ msg: "Not all fields have been entered." });

    const user = await User.findOne({ email: email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "No account with this email has been registered." });

    const isMatch = await (password === user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

    const token = jwt.sign({ id: user._id }, JWT_SECRET);
    res.json({
      token,
      user: {
        id: user._id,
        displayName: user.displayName,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
