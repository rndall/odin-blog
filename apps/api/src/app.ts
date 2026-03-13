import express, { type Express } from "express";
import { errorHandler } from "@/middlewares/errorHandler";

const app: Express = express();

app.use(errorHandler);

export default app;
