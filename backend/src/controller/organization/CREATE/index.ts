import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";

import { BadRequestError } from "../../../model/api-errors";
import { CreateOrganization, createOrganizationSchema } from "../../../model/schema/organizationSchema";
import { getOrganization } from "../organizationController";

const create_organization = async (req: Request, res: Response) => {
  const requestData: CreateOrganization = await createOrganizationSchema.validate(req.body, { abortEarly: false });
  const { description } = requestData;

  const organization = await getOrganization(description);

  if (!organization) {
    const newOrganization = await prisma.organization.create({ data: { description } });

    return res.status(201).json({ message: `Organization ${newOrganization.description} created sucessfully` });
  }

  throw new BadRequestError("Organization already created");
}

export { create_organization };