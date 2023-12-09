import InterestingTableController from "../controllers/interestingTable.controller";
import InterestingTableService from "../services/interestingTable.service";
import InterestingTableRouter from "../routes/interestingTable.router";

const interestingTableService = new InterestingTableService();
const interestingTableController = new InterestingTableController(interestingTableService);
const interestingTableRouter = new InterestingTableRouter(interestingTableController);

export const interestingTableModule = {
  service: interestingTableService,
  controller: interestingTableController,
  router: interestingTableRouter.getRouter(),
};
