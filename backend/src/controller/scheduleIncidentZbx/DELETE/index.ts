import { Request, Response } from "express";
import { getScheduleIncidentById } from "../listenTrigger";
import { NotFoundError } from "../../../model/api-errors";
import { scheduledJobs } from "node-schedule";
import { prisma } from "../../../database/prismaClient";

export const delete_schedule_incident_zbx = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getScheduleIncidentById(Number(id));

  if (schedule) {
    scheduledJobs[`inc${id}`].cancel();
    await prisma.scheduleIncidentZabbix.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: 'Schedule deleted sucessfully' });
  }

  throw new NotFoundError("Schedule Not Found");
}