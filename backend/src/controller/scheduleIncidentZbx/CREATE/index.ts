import { Request, Response } from "express";
import { CreateScheduleIncident, createScheduleIncident } from "../../../model/schema/scheduleIncidentSchema";
import { prisma } from "../../../database/prismaClient";
import { scheduleJob, scheduledJobs } from "node-schedule";
import { threadNewMessage } from "../../../middlewares/diagnosticTrigger";
import { BadRequestError } from "../../../model/api-errors";

const create_schedule_check_incident_zabbix = async (req: Request, res: Response) => {
  const { user } = req;

  const requestData: CreateScheduleIncident = await createScheduleIncident.validate(req.body, { abortEarly: false });
  const { interval } = requestData;

  const incident_zabbix = await prisma.scheduleIncidentZabbix.findFirst({
    where: {
      organization_id: user.organization_id
    }
  });

  if (incident_zabbix) {
    throw new BadRequestError("Schedule has Exist");
  }

  const job = await prisma.scheduleIncidentZabbix.create({ data: { seconds_interval: interval, organization_id: user.organization_id ?? 0 } });

  scheduledJobs[`inc${job.id}`] = scheduleJob(`*/${interval} * * * * *`, async () => {
    await threadNewMessage();
  });

  return res.status(201).json({ message: "Schedule Check new Incidents created sucessfully" });
};

export { create_schedule_check_incident_zabbix };