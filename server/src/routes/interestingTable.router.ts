import express from "express";
import InterestingTableController from "../controllers/interestingTable.controller";

class InterestingTableRouter {
  interestingTableController: InterestingTableController;

  constructor(interestingTableController: InterestingTableController) {
    this.interestingTableController = interestingTableController;
  }

  getRouter() {
    const router = express.Router();
    router.route("/agreements-stuff-clients").get(this.interestingTableController.getAgreementsStuffClients);
    router.route("/agreements-amount").get(this.interestingTableController.getAgreementsAmount);
    router.route("/stuff-selled-by-client").get(this.interestingTableController.getStuffSelledByClient);
    router.route("/most-agreements-by-client").get(this.interestingTableController.getMostAgreementsByClient);
    router.route("/most-avg-stuff").get(this.interestingTableController.getMostAvgStuff);
    router.route("/stuff-by-quantity").post(this.interestingTableController.getStuffByQuantity);
    router.route("/client-by-name").post(this.interestingTableController.getClientByName);
    router.route("/client-of-stuff").get(this.interestingTableController.getClientMostVarietyOfStuff);
    router.route("/client-by-agreements").post(this.interestingTableController.getClientByAgreements);
    router.route("/stuff-by-min-max").post(this.interestingTableController.getStuffByMinMax);
    router.route("/stuff-by-description").post(this.interestingTableController.getStuffByDescription);
    router.route("/agreements-by-wholesale").post(this.interestingTableController.getStuffByWholesalePrice);

    return router;
  }
}

export default InterestingTableRouter;
