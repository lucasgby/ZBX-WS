import { Request, Response } from "express";

import { prisma } from "../../../database/prismaClient";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { SearchSchema, searchSchema } from "../../../model/schema/searchSchema";
import { getOrganizationById } from "../organizationController";
import { NotFoundError } from "../../../model/api-errors";
import { formatPagination } from "../../../model/configPagination";

const get_all_organization = async (req: Request, res: Response) => {
  const requestPagination: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { take, page } = requestPagination;

  const { pagination } = formatPagination({ page, take });

  const [organizations, totalCount] = await Promise.all([
    await prisma.organization.findMany({
      skip: pagination.page,
      take: pagination.take,
    }),

    prisma.organization.count()
  ]);

  return res.status(200).json({
    result: organizations,
    _count: { itens: totalCount }
  });
}

const search_organization = async (req: Request, res: Response) => {
  const searchData: SearchSchema = await searchSchema.validate(req.body, { abortEarly: false });
  const { filter, is_active } = searchData;

  const [organizations, totalCount] = await Promise.all([
    prisma.organization.findMany({
      where: {
        description: {
          contains: filter
        },

        is_active: is_active
      }
    }),

    prisma.organization.count()
  ]);

  return res.status(200).json({
    result: organizations,
    _count: { itens: totalCount }
  });
}

const get_organization = async (req: Request, res: Response) => {
  const { id } = req.params;

  const organization = await getOrganizationById(Number(id));

  if (organization) {
    return res.status(200).json({ result: organization });
  }

  throw new NotFoundError("Organization Not Found");

}

export { get_all_organization, search_organization, get_organization };