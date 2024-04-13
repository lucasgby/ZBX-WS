import { Request, Response } from "express";

import { prisma } from "../database/prismaClient";

const statusController = async (req: Request, res: Response) => {
  const clientConnect = await prisma.session.findMany()

  return res.status(200).json({ result: clientConnect })
}

export {
  statusController
}