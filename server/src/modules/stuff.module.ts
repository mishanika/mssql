import StuffController from "../controllers/stuff.controller";
import StuffService from "../services/stuff.service";
import StuffRouter from "../routes/stuff.router";

const stuffService = new StuffService();
const stuffController = new StuffController(stuffService);
const stuffRouter = new StuffRouter(stuffController);

export const stuffModule = {
  service: stuffService,
  controller: stuffController,
  router: stuffRouter.getRouter(),
};
