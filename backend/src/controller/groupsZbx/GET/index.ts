import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { NotFoundError } from "../../../model/api-errors";

async function getGroupByDescription(description: string) {
  const group = await prisma.hostGroup.findUnique({ where: { description } });

  return group;
};

async function getGroupById(id: number) {
  const group = await prisma.hostGroup.findUnique({ where: { id } });

  return group;
}

const get_group = async (req: Request, res: Response) => {
  const { id } = req.params;
  const id_group = Number(id);

  const group = await getGroupById(id_group);

  if (!group) throw new NotFoundError("Group Zabbix not Found");

  return res.status(200).json({ result: group });
};

export { getGroupByDescription, get_group, getGroupById };