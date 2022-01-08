import mongoose from "mongoose";

// Setting up the Schema for News Model
const Schema = mongoose.Schema;

// The model below is what will be put into the News Collection in MongoDB
export const NewsSchema = new Schema({
  headline: {
    type: String,
    required: "Enter a Heading",
  },
  text: {
    type: String,
    required: "Enter Text",
  },
  customerType: {
    type: String,
    required: "Enter a Customer Type",
  },
});
