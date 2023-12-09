import { Request, Response } from "express";
import StuffService from "../services/stuff.service";

class StuffController {
  stuffService: StuffService;
  constructor(stuffService: StuffService) {
    this.stuffService = stuffService;
  }

  getStuff = async (req: Request, res: Response) => {
    return res.json(await this.stuffService.getStuff());
  };

  createStuff = async (req: Request, res: Response) => {
    const flag = await this.stuffService.createStuff(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  deleteStuff = async (req: Request, res: Response) => {
    const flag = await this.stuffService.deleteStuff(req.body.id);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  updateStuff = async (req: Request, res: Response) => {
    const flag = await this.stuffService.updateStuff(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };
}

export default StuffController;
