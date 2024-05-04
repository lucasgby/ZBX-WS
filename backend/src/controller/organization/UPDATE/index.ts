import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { UpdateOrganization, updateOrganizationSchema } from "../../../model/schema/organizationSchema";
import { NotFoundError } from "../../../model/api-errors";

import { getOrganizationById } from "../organizationController";
import { SelectMoreThanStatusType, selectMoreThanStatusSchema } from "../../../model/schema/selectMoreThanSchema";

const update_organization = async (req: Request, res: Response) => {
  const { id } = req.params;

  const requestData: UpdateOrganization = await updateOrganizationSchema.validate(req.body, { abortEarly: false });
  const { description, is_active } = requestData;

  const organization = await getOrganizationById(Number(id));

  if (organization) {
    await prisma.organization.update({
      where: { id: Number(id) },
      data: {
        description,
        is_active
      }
    });

    return res.status(201).json({ message: `Organization ${organization.description} has sucessfully updated` });
  }

  throw new NotFoundError("Organization not found");
}

const alter_status_organizations = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanStatusType = await selectMoreThanStatusSchema.validate(req.body, { abortEarly: false });
  const { data, action } = requestData;

  const ids = data.map(value => value.id);

  await prisma.organization.updateMany({
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

export { update_organization, alter_status_organizations };