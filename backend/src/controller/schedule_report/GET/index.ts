import { Request, Response } from "express";

import { prisma } from "../../../database/prismaClient";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { formatPagination } from "../../../model/configPagination";
import { getOrganizationById } from "../../organization/organizationController";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { RolesType } from "../../../model/roles";

interface Props {
  id: number;
  res: Response;
  page: number;
  take: number;
}

async function getSheduleById(id: number) {
  const schedule = await prisma.schedule.findUnique({ where: { id } });

  return schedule;
}

async function loadSchedules({ id, page, res, take }: Props) {
  const [schedules, totalCount] = await Promise.all([
    prisma.schedule.findMany({
      skip: page,
      take: take,
      where: {
        organization_id: id
      }
    }),

    prisma.schedule.count({ where: { organization_id: id } })
  ]);

  return res.status(200).json({ result: schedules, _count: { items: totalCount } });
}

const get_all_schedule = async (req: Request, res: Response) => {
  const { user } = req;

  const requestPagination: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { take, page, id } = requestPagination;

  const { pagination } = formatPagination({ page, take });

  if (user.role === RolesType.SUPER_ADMIN) {
    if (!id) throw new BadRequestError("The id parameter referring to the organization is required");

    const organization = await getOrganizationById(Number(id));

    if (!organization) throw new NotFoundError("Organization Not Found");

    await loadSchedules({ id: organization.id, page: pagination.page, res, take: pagination.take });
  }

  else if (user.role === RolesType.ADMIN || user.role === RolesType.USER_READ) {
    await loadSchedules({ id: Number(user.organization_id), page: pagination.page, res, take: pagination.take });
  }
};

export {
  getSheduleById,
  get_all_schedule
}