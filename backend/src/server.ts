import "reflect-metadata";
import "express-async-errors";

import schedule from "node-schedule";
import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import { diagnosticController } from "./controller/diagnosticController";
import { reportTriggerWeekly } from "./controller/reportController";

import { routes } from "./routes";
import { CONSTANTS } from "./config/server";
import { client } from "./controller/mainController";

import { errorMiddleware } from "./middlewares/error";

const app = express();

diagnosticController();

schedule.scheduleJob({ hour: 9, minute: 0, dayOfWeek: 6 }, async () => {
  await reportTriggerWeekly();
});

app.use(cors({
    origin: "*",
    allowedHeaders: "*",
    methods: ["GET", "PUT", "POST"]
}));

app.use(bodyParser.json());
app.use(routes);
app.use(errorMiddleware);

client.initialize();

app.listen(CONSTANTS.PORT, () => {
  console.log(`Server  is running in: http://localhost:${CONSTANTS.PORT}`);
})