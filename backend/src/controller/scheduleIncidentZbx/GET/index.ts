import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { formatPagination } from "../../../model/configPagination";
import { getScheduleIncidentById } from "../listenTrigger";

import { NotFoundError } from "../../../model/api-errors";

const get_all_schedules_check_incident = async (req: Request, res: Response) => {
  const requestPagination: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { take, page } = requestPagination;

  const { pagination } = formatPagination({ page, take });

  const [schedules, totalCount] = await Promise.all([
    await prisma.scheduleIncidentZabbix.findMany({
      skip: pagination.page,
      take: pagination.take,
    }),

    prisma.scheduleIncidentZabbix.count()
  ]);

  return res.status(200).json({
    result: schedules,
    _count: { itens: totalCount }
  });
};

const get_schedule_check_incident = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getScheduleIncidentById(Number(id));

  if (schedule) {

    return res.status(200).json({ result: schedule });
  }

  throw new NotFoundError("Schedule Not Found");
}

export { get_all_schedules_check_incident, get_schedule_check_incident };