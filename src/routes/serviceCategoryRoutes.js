import {
  addNewServiceCategory,
  getServiceCategories,
  getServiceCategoryWithID,
  updateServiceCategory,
  deleteServiceCategory,
} from "../controllers/serviceCategoryController.js";
import { requireToken } from "../middleware/requireToken.js";

// The below Routes are for Get/Post/Put/Delete for Service Categories Routes
const serviceCategoryRoutes = (app) => {
  app
    .route("/servicecategories")
    .get(requireToken, getServiceCategories)
    .post(requireToken, addNewServiceCategory);

  app
    .route("/serviceCategory/:serviceCategoryID")
    .get(requireToken, getServiceCategoryWithID)
    .put(requireToken, updateServiceCategory)
    .delete(requireToken, deleteServiceCategory);
};

export default serviceCategoryRoutes;
