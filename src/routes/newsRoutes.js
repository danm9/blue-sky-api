import {
  addNewNews,
  getNews,
  getNewsWithID,
  updateNews,
  deleteNews,
} from "../controllers/newsController.js";
import { requireToken } from "../middleware/requireToken.js";

// The below Routes are for Get/Post/Put/Delete for News Routes
const newsRoutes = (app) => {
  app.route("/news").get(requireToken, getNews).post(requireToken, addNewNews);

  app
    .route("/News/:newsID")
    .get(requireToken, getNewsWithID)
    .put(requireToken, updateNews)
    .delete(requireToken, deleteNews);
};

export default newsRoutes;
