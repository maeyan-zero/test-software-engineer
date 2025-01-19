import express from "express";
import { createEventRouter } from "@/api/events";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.use("/api/event", createEventRouter());

export default app;
