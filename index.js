require("dotenv").config();
const express = require("express");
const server = express();
const cors = require("cors");
const { json, urlencoded } = require("body-parser");
const cp = require("cookie-parser");
const morgan = require("morgan");
const helmet = require("helmet");
const port = process.env.PORT || 8080;

const { accountController } = require('./account');

server.use(cors());
server.use(json());
server.use(urlencoded({extended: true}));
server.use(helmet());
server.use(cp());
server.use(morgan('dev'));

server.use('/account', accountController);

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`);
});