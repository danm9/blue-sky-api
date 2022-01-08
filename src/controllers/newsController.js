import mongoose from "mongoose";
import { NewsSchema } from "../models/newsModel.js";

// Mongoose Model for using MongoDB
const News = mongoose.model("news", NewsSchema);

// The controllers below are to Add New News, Get News, Get News with an ID, Update News, and Delete News
export const addNewNews = (req, res) => {
  let newNews = new News(req.body);

  newNews.save((err, news) => {
    if (err) {
      res.send(err);
    }
    res.json(news);
  });
};

export const getNews = (req, res) => {
  News.find({}, (err, news) => {
    if (err) {
      res.send(err);
    }
    res.json(news);
  });
};

export const getNewsWithID = (req, res) => {
  News.findById(req.params.newsID, (err, news) => {
    if (err) {
      res.send(err);
    }
    res.json(news);
  });
};

export const updateNews = (req, res) => {
  News.findOneAndUpdate(
    { _id: req.params.newsID },
    req.body,
    { new: true, useFindAndModify: false },
    (err, news) => {
      if (err) {
        res.send(err);
      }
      res.json(news);
    }
  );
};

export const deleteNews = (req, res) => {
  News.remove({ _id: req.params.newsID }, (err, news) => {
    if (err) {
      res.send(err);
    }
    res.json({ message: "successfully deleted news" });
  });
};
