import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import { UserSchema } from "../models/userModel.js";
import { JWT_SECRET } from "../config/jwtConfig.js";

const User = mongoose.model("user", UserSchema);

const _validateToken = async (req, res) => {
  let header = req.header("Authorization");
  if (!header) {
    console.error("Unauthorized: No token detected.");
    return false;
  }

  let token;
  try {
    token = header.split(' ')[1];
  } catch {
    console.error("Unauthorized: Error reading token from header: " + err);
    return false;
  }

  if (!token) return false;

  const verified = jwt.verify(token, JWT_SECRET);//process.env.JWT_SECRET);
  if (!verified) return false;

  const user = await User.findById(verified.id);
  if (!user) return false;

  return true;
};

export const validateToken = async (req, res) => {
  try {
    let isValid = await _validateToken(req, res);
    if (isValid === true) return res.json(true);
    res.json(false);
  } catch (err) {
    console.log("err: " + err);
    res.status(500).json({ error: err.message });
  }
};

export const requireToken = async (req, res, next) => {
  try {
    let isValid = await _validateToken(req, res);
    if (isValid === true) next(); else res.status(401).json({Unauthorized: 'Missing or invalid token'});
  } catch (err) {
    console.log("err: " + err);
    res.status(500).json({ error: err.message });
  }
};
