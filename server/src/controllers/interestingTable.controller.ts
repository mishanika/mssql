import { Request, Response } from "express";
import InterestingTableService from "../services/interestingTable.service";

class InterestingTableController {
  interestingTableService: InterestingTableService;
  constructor(interestingTableService: InterestingTableService) {
    this.interestingTableService = interestingTableService;
  }

  getAgreementsStuffClients = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getAgreementsStuffClients());
  };

  getAgreementsAmount = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getAgreementsAmount());
  };

  getStuffSelledByClient = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getStuffSelledByClient());
  };

  getMostAgreementsByClient = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getMostAgreementsByClient());
  };

  getMostAvgStuff = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getMostAvgStuff());
  };

  getStuffByQuantity = async (req: Request, res: Response) => {
    const { quantity } = req.body;
    if (!parseInt(quantity)) {
      return res.status(500).json({ error: "Must be a number" });
    }
    return res.json(await this.interestingTableService.getStuffByQuantity(parseInt(quantity)));
  };

  getClientByName = async (req: Request, res: Response) => {
    const { name } = req.body;
    return res.json(await this.interestingTableService.getClientByName(name));
  };

  getClientMostVarietyOfStuff = async (req: Request, res: Response) => {
    return res.json(await this.interestingTableService.getClientMostVarietyOfStuff());
  };

  getClientByAgreements = async (req: Request, res: Response) => {
    const { amount } = req.body;
    if (!parseInt(amount)) {
      return res.status(500).json({ error: "Must be a number" });
    }
    return res.json(await this.interestingTableService.getClientByAgreements(parseInt(amount)));
  };

  getStuffByMinMax = async (req: Request, res: Response) => {
    const { min, max } = req.body;
    if (!parseInt(min) || !parseInt(max)) {
      return res.status(500).json({ error: "Min and max must be a numbers" });
    }
    return res.json(await this.interestingTableService.getStuffByMinMax(parseInt(min), parseInt(max)));
  };

  getStuffByDescription = async (req: Request, res: Response) => {
    const { description } = req.body;
    return res.json(await this.interestingTableService.getStuffByDescription(description));
  };

  getStuffByWholesalePrice = async (req: Request, res: Response) => {
    const { limit } = req.body;
    console.log(parseInt(limit));
    if (!parseInt(limit)) {
      return res.status(500).json({ error: "Must be a numbers" });
    }
    return res.json(await this.interestingTableService.getStuffByWholesalePrice(parseInt(limit)));
  };
}

export default InterestingTableController;
