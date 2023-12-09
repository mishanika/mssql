import { Request, Response } from "express";
import AgreementsService from "../services/agreements.service";

class AgreementsController {
  agreementsService: AgreementsService;
  constructor(agreementsService: AgreementsService) {
    this.agreementsService = agreementsService;
  }

  getAgreements = async (req: Request, res: Response) => {
    return res.json(await this.agreementsService.getAgreements());
  };

  createAgreements = async (req: Request, res: Response) => {
    const flag = await this.agreementsService.createAgreements(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  deleteAgreements = async (req: Request, res: Response) => {
    const flag = await this.agreementsService.deleteAgreements(req.body.id);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  updateAgreements = async (req: Request, res: Response) => {
    const flag = await this.agreementsService.updateAgreements(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };
}

export default AgreementsController;
