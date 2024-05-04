import { Request, Response } from 'express';
import { prisma } from '../../../database/prismaClient';
import { NotFoundError } from '../../../model/api-errors';

const delete_report = async (req: Request, res: Response) => {
  const { id } = req.params;

  const report = await prisma.report.delete({ where: { id: Number(id) } });

  if (!report) throw new NotFoundError("Report Not Found");

  await prisma.report.delete({ where: { id: Number(id) } });

  return res.status(200).json({ message: "Report deleted sucessfully." });
};

export { delete_report }