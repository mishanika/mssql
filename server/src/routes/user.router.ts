import express from "express";
import UserController from "../controllers/user.controller";

class UserRouter {
  userController: UserController;

  constructor(userController: UserController) {
    this.userController = userController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.userController.getUsers);
    router.route("/create").post(this.userController.createUser);
    router.route("/delete").post(this.userController.deleteUser);
    router.route("/update").post(this.userController.updateUser);

    return router;
  }
}

export default UserRouter;
