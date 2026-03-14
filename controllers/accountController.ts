import express from "express";
import { z } from "zod";
import AccountService from "../services/accountService";
import { validate } from "../src/middleware/validate";

const loginSchema = z.object({
  body: z.object({
    username: z.string().min(3),
    password: z.string().min(6),
  }),
});

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(6),
  }),
});

export default class AccountController {
  public router: express.Router;
  private accountService: AccountService;

  constructor() {
    this.accountService = new AccountService();
    this.router = express.Router();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/login", validate(loginSchema), this.login);
    this.router.post("/register", validate(registerSchema), this.register);
  }

  login = async (req: express.Request, res: express.Response) => {
    const { username, password } = req.body;
    const token = await this.accountService.login(username, password);
    res.status(200).json({ status: "success", data: { token } });
  };

  register = async (req: express.Request, res: express.Response) => {
    const { email, username, password } = req.body;
    const token = await this.accountService.register(
      email,
      username,
      password,
    );
    res.status(200).json({ status: "success", data: { token } });
  };
}
