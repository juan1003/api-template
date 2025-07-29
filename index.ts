import express from "express";
import cp from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import AccountController from "./controllers/accountController";

const port = process.env.PORT || 8080;
const server = express();
const accountController = new AccountController();

server.use(cors());
server.use(express.json());
server.use(express.urlencoded({extended: true}));
server.use(helmet());
server.use(cp());
server.use(morgan('dev'));

server.use("/account", [accountController.register, accountController.login]);

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});
