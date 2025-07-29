import express from "express";
import AccountService from "../services/accountService";

export default class AccountControlle {
  private accountService: AccountService;
  private router: express.Router;

  constructor() {
    this.accountService = new AccountService();
    this.router = express.Router();
    this.router.post("/login", this.login);
    this.router.post("/register", this.register);
    return this;
  }

  login = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    try {
      const token = await this.accountService.login(username, password);
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  };

  register = async (req: express.Request, res: express.Response) => {
    const { email, username, password } = req.body;
    try {
      const token = await this.accountService.register(
        email,
        username,
        password,
      );
      res.status(200).json({ token });
    } catch (error) {
      res.status(400).json({ error });
    }
    return;
  };
}
