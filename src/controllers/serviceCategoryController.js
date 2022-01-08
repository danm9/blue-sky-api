import mongoose from "mongoose";
import { ServiceCategorySchema } from "../models/serviceCategoryModel.js";

// Mongoose Model for using MongoDB
const ServiceCategory = mongoose.model(
  "serviceCategory",
  ServiceCategorySchema
);

// The controllers below are to Add New Service Categories, Get Service Categories, Get Service Categories with an ID, Update Service Categories, and Delete Service Categories
export const addNewServiceCategory = (req, res) => {
  let newServiceCategory = new ServiceCategory(req.body);

  newServiceCategory.save((err, serviceCategory) => {
    if (err) {
      res.send(err);
    }
    res.json(serviceCategory);
  });
};

export const getServiceCategories = (req, res) => {
  ServiceCategory.find({}, (err, serviceCategory) => {
    if (err) {
      res.send(err);
    }
    res.json(serviceCategory);
  });
};

export const getServiceCategoryWithID = (req, res) => {
  ServiceCategory.findById(
    req.params.serviceCategoryID,
    (err, serviceCategory) => {
      if (err) {
        res.send(err);
      }
      res.json(serviceCategory);
    }
  );
};

export const updateServiceCategory = (req, res) => {
  ServiceCategory.findOneAndUpdate(
    { _id: req.params.serviceCategoryID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, serviceCategory) => {
      if (err) {
        res.send(err);
      }
      res.json(serviceCategory);
    }
  );
};

export const deleteServiceCategory = (req, res) => {
  ServiceCategory.remove(
    { _id: req.params.serviceCategoryID },
    (err, serviceCategory) => {
      if (err) {
        res.send(err);
      }
      res.json({ message: "successfully deleted serviceCategory" });
    }
  );
};
