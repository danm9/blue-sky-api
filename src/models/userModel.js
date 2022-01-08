import mongoose from "mongoose";

// Setting up the Schema for Users Model
const Schema = mongoose.Schema;

// The model below is what will be put into the Users Collection in MongoDB
export const UserSchema = new Schema({
  email: {
    type: String,
    required: "Enter an email",
  },
  firstName: {
    type: String,
    required: "Enter a first name",
  },
  lastName: {
    type: String,
    required: "Enter a last name",
  },
  password: {
    type: String,
    required: "Enter a password",
  },
  accountNumber: {
    type: Number,
  },
  accountType: {
    type: String,
    required: "Enter an account type",
  },
  invoices: {
    type: Array,
  },
  created_date: {
    type: Date,
    default: Date.now,
  },
});
