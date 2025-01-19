import express from "express";
import { createEventRouter } from "@/api/events";

const app = express();

app.use("/api/event", createEventRouter());

export default app;
