import express, { static as serve } from "express";
import { join, resolve } from "path";
import bodyParser from "body-parser";
import cors from "cors";

import { taskRouter } from "./task.router.js";

const __dirname = resolve();
export const middleware = express();

middleware
 .use(serve(join(__dirname, "/public")))
 .use(cors())
 .use(bodyParser.json())
 .use(bodyParser.urlencoded({ extended: true }))
 .use("/tasks", taskRouter)