import { Request, Response } from "express";
import { client } from "./mainController";

const statusController = async (req: Request, res: Response) => {
  const clientConnect = await client.getState();
}

export {
  statusController
}