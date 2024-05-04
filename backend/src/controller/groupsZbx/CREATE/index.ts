import { Request, Response } from "express";
import { CreateHostGroup, createHostGroupSchema } from "../../../model/schema/hostgroupSchema";
import { prisma } from "../../../database/prismaClient";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { getGroupByDescription } from "../GET";
import { getOrganizationById } from "../../organization/organizationController";

const create_hostgroup = async (req: Request, res: Response) => {
  const requestData: CreateHostGroup = await createHostGroupSchema.validate(req.body, { abortEarly: false });
  const { description, group_host_id, hostid, id_g_ws, organization_id } = requestData;
  
  const hostgroup = await getGroupByDescription(description);

  if (hostgroup) throw new BadRequestError("Description HostGruop in ussed");
  
  const checkOrganization = await getOrganizationById(organization_id);

  if (!checkOrganization) throw new NotFoundError("Organization Not Found");

  await prisma.hostGroup.create({
    data: {
      description, group_host_id, hostid, id_g_ws, organization_id
    }
  });

  return res.status(201).json({ message: "HostGroup sucessfully created" });
}

export { create_hostgroup };