import { Request, Response } from "express";
import { getOrganizationById } from "../organizationController";
import { prisma } from "../../../database/prismaClient";
import { NotFoundError } from "../../../model/api-errors";
import { SelectMoreThanOrganization, selectMoreThanOrganization } from "../../../model/schema/organizationSchema";

const delete_organization = async (req: Request, res: Response) => {
  const { id } = req.params;

  const organization = await getOrganizationById(Number(id));

  if (organization) {
    await prisma.organization.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: `Organization ${organization.description} has successfully deleted` });
  }

  throw new NotFoundError("Organization Not Found");
};

const delete_more_than_organization = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanOrganization = await selectMoreThanOrganization.validate(req.body, { abortEarly: false });
  const { data } = requestData;

  const ids = data.map(value => value.id);

  await prisma.organization.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  return res.status(200).json({ message: "Organizations has sucessfully deleted" });
};

export { delete_organization, delete_more_than_organization };