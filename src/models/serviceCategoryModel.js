import mongoose from "mongoose";

// Setting up the Schema for Service Categories Model
const Schema = mongoose.Schema;

// The model below is what will be put into the Service Categories Collection in MongoDB
export const ServiceCategorySchema = new Schema({
  customerType: {
    type: String,
  },
  services: {
    type: Array,
  },
});
