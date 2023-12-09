import express from "express";
import StuffController from "../controllers/stuff.controller";

class StuffRouter {
  stuffController: StuffController;

  constructor(stuffController: StuffController) {
    this.stuffController = stuffController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.stuffController.getStuff);
    router.route("/create").post(this.stuffController.createStuff);
    router.route("/delete").post(this.stuffController.deleteStuff);
    router.route("/update").post(this.stuffController.updateStuff);

    return router;
  }
}

export default StuffRouter;
