import { Request, Response } from "express";
import { NotFoundError } from "../../../model/api-errors";
import { getGroupByDescription, getGroupById } from "../GET";
import { prisma } from "../../../database/prismaClient";
import { UpdateHostGroup, updateHostGroupSchema } from "../../../model/schema/hostgroupSchema";
import { SelectMoreThanStatusType, selectMoreThanStatusSchema } from "../../../model/schema/selectMoreThanSchema";

const update_group = async (req: Request, res: Response) => {
  const { id } = req.params;
  const id_group = Number(id);

  const requestData: UpdateHostGroup = await updateHostGroupSchema.validate(req.body, { abortEarly: false });

  const group = await getGroupById(id_group);

  if (!group) throw new NotFoundError("Organization not found");

  await prisma.organization.update({
    where: { id: id_group },
    data: requestData
  });

  return res.status(201).json({ message: `Group ${group.description} has sucessfully updated` });

}

const alter_status_groups = async (req: Request, res: Response) => {
  const requestData: SelectMoreThanStatusType = await selectMoreThanStatusSchema.validate(req.body, { abortEarly: false });
  const { data, action } = requestData;

  const ids = data.map(value => value.id);

  await prisma.hostGroup.updateMany({
    where: {
      id: {
        in: ids
      },
    },
    data: {
      is_active: action
    }
  });

  return res.status(200).json({ message: "Organizations has sucessfully actives" });
}

export { alter_status_groups, update_group };