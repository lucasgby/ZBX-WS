import { Request, Response } from "express";
import { getGroupById } from "../GET";
import { NotFoundError } from "../../../model/api-errors";
import { prisma } from "../../../database/prismaClient";
import { SelectMoreThanType, selectMoreThanSchema } from "../../../model/schema/selectMoreThanSchema";

const delete_group = async (req: Request, res: Response) => {
  const { id } = req.params;
  const id_group = Number(id);

  const group = await getGroupById(id_group);

  if (!group) throw new NotFoundError("Group Not Found");

  await prisma.hostGroup.delete({ where: { id: id_group } });

  return res.status(201).json({ message: `Group ${group.description} Sucessfully deleted.` });
}

const delete_more_than_groups = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanType = await selectMoreThanSchema.validate(req.body, { abortEarly: false });
  const { data } = requestData;

  const ids = data.map(value => value.id);

  await prisma.hostGroup.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  return res.status(200).json({ message: "Groups has sucessfully deleted" });
};


export { delete_group, delete_more_than_groups };