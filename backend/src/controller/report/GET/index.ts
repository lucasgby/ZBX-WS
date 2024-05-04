import { Request, Response } from "express";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { getOrganizationById } from "../../organization/organizationController";
import { NotFoundError } from "../../../model/api-errors";
import { prisma } from "../../../database/prismaClient";
import { RolesType } from "../../../model/roles";
import { formatPagination } from "../../../model/configPagination";

interface Props {
  id: number;
  page: number | undefined;
  take: number | undefined
  res: Response
}

async function loadReportsByOrganization({ id, page, take, res }: Props) {
  const organization = await getOrganizationById(id);

  if (organization) {
    const [reports, totalCount] = await Promise.all([
      await prisma.report.findMany({
        skip: page,
        take
      }),

      prisma.report.count({
        where: {
          organization_id: id
        }
      })
    ]);

    return res.status(200).json({ result: reports, _count: { itens: totalCount } });
  }

  throw new NotFoundError("Organization Not Found");
}

const get_all_reports = async (req: Request, res: Response) => {
  const { user } = req;

  const requestPagination: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { take, page, id } = requestPagination;
  
  const { pagination } = formatPagination({ page, take });

  switch (true) {
    case (user.role === RolesType.USER_READ || user.role === RolesType.ADMIN):
      await loadReportsByOrganization({ id: Number(user.organization_id), page: pagination.page, res, take: pagination.take });
      break
    
    case (user.role === RolesType.SUPER_ADMIN):
      await loadReportsByOrganization({ id: Number(id), page: pagination.page, res, take: pagination.take });
      break
  }
}

export { get_all_reports };