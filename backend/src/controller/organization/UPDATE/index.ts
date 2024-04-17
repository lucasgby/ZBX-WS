import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { SelectMoreThanOrganization, UpdateOrganization, selectMoreThanOrganization, updateOrganizationSchema } from "../../../model/schema/organizationSchema";
import { NotFoundError } from "../../../model/api-errors";

import { getOrganizationById } from "../organizationController";

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

const active_organizations = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanOrganization = await selectMoreThanOrganization.validate(req.body, { abortEarly: false });
  const { data } = requestData;

  const ids = data.map(value => value.id);

  await prisma.organization.updateMany({
    where: {
      id: {
        in: ids
      },
    },
    data: {
      is_active: true
    }
  });

  return res.status(200).json({ message: "Organizations has sucessfully actives" });
}

const desable_organizations = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanOrganization = await selectMoreThanOrganization.validate(req.body, { abortEarly: false });
  const { data } = requestData;

  const ids = data.map(value => value.id);

  await prisma.organization.updateMany({
    where: {
      id: {
        in: ids
      },
    },
    data: {
      is_active: false
    }
  });

  return res.status(200).json({ message: "Organizations has sucessfully desables" });
}

export { update_organization, active_organizations, desable_organizations };