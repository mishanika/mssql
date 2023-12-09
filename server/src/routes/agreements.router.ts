import express from "express";
import AgreementsController from "../controllers/agreements.controller";

class AgreementsRouter {
  agreementsController: AgreementsController;

  constructor(agreementsController: AgreementsController) {
    this.agreementsController = agreementsController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/").get(this.agreementsController.getAgreements);
    router.route("/create").post(this.agreementsController.createAgreements);
    router.route("/delete").post(this.agreementsController.deleteAgreements);
    router.route("/update").post(this.agreementsController.updateAgreements);

    return router;
  }
}

export default AgreementsRouter;
