import {
  addNewUser,
  userExists,
  getUsers,
  getUserWithID,
  updateUser,
  deleteUser,
  login,
} from "../controllers/userController.js";
import { validateToken, requireToken } from "../middleware/requireToken.js";

// The below Routes are for Get/Post/Put/Delete for Users Routes
const userRoutes = (app) => {
  app
    .route("/users")
    .get(requireToken, getUsers)
    .post(addNewUser);

  app
    .route("/user/:userID")
    .get(requireToken, getUserWithID)
    .put(requireToken, updateUser)
    .delete(requireToken, deleteUser);

  app
    .route("/userExists")
    .get(userExists);

  app.route("/login").post(login);

  app.route("/validateToken").post(validateToken);
};

export default userRoutes;
