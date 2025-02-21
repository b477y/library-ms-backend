import express from "express";
import path from "node:path";
import * as dotenv from "dotenv";
import { bootstrap } from "./src/app.controller.js";

dotenv.config({ path: path.resolve("./src/config/.env.dev") });

const app = express();
const PORT = process.env.PORT;

bootstrap(app, express);
