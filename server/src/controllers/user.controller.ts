import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
  userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
  }

  getUsers = async (req: Request, res: Response) => {
    return res.json(await this.userService.getUsers());
  };

  createUser = async (req: Request, res: Response) => {
    const flag = await this.userService.createUser(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  deleteUser = async (req: Request, res: Response) => {
    const flag = await this.userService.deleteUser(req.body.id);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };

  updateUser = async (req: Request, res: Response) => {
    const flag = await this.userService.updateUser(req.body);

    return flag.status ? res.status(200).json(null) : res.status(500).json({ error: flag.error });
  };
}

export default UserController;
