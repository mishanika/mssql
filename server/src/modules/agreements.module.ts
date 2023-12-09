import AgreementsController from "../controllers/agreements.controller";
import AgreementsService from "../services/agreements.service";
import AgreementsRouter from "../routes/agreements.router";

const agreementsService = new AgreementsService();
const agreementsController = new AgreementsController(agreementsService);
const agreementsRouter = new AgreementsRouter(agreementsController);

export const agreementsModule = {
  service: agreementsService,
  controller: agreementsController,
  router: agreementsRouter.getRouter(),
};
