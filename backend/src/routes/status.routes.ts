import { Router } from "express";
import { connectWS } from "../controller/connectWSController";

const statusRoutes = Router();

statusRoutes.get('/connect-ws', connectWS);

export {
  statusRoutes
}