import { Request, Response } from "express";

import { scheduleJob, scheduledJobs } from 'node-schedule';
import { UpdateScheduleIncident, updateScheduleIncident } from "../../../model/schema/scheduleIncidentSchema";
import { prisma } from "../../../database/prismaClient";
import { threadNewMessage } from "../../../middlewares/diagnosticTrigger";
import { NotFoundError } from "../../../model/api-errors";
import { getScheduleIncidentById } from "../listenTrigger";

const update_interval_schedule_incident = async (req: Request, res: Response) => {
  const { id } = req.params;

  const requestData: UpdateScheduleIncident = await updateScheduleIncident.validate(req.body, { abortEarly: false });
  const { interval } = requestData;

  const schedule = await getScheduleIncidentById(Number(id));
  
  if (schedule) {
   scheduledJobs[`inc${id}`].cancel();

    await prisma.scheduleIncidentZabbix.update({
      where: { id: Number(id) },
      data: { seconds_interval: interval }
    });
    
    scheduledJobs[`inc${id}`] = scheduleJob(`*/${interval} * * * * *`, async () => {
      await threadNewMessage();
    });

    return res.status(201).json({ message: "Interval Schedule updated sucessfully" });
  }

  throw new NotFoundError("Schedule Not Found");
}

const desable_schedule_incident = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getScheduleIncidentById(Number(id));

  if (schedule) {
    scheduledJobs[`inc${id}`].cancel();

    await prisma.scheduleIncidentZabbix.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: false
      }
    });

    return res.status(201).json({ message: `Job Disable sucessfully.` }); 
  }

  throw new NotFoundError("Schedule Not Found");
}

const active_schedule_incident = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getScheduleIncidentById(Number(id));

  if (schedule) {
    scheduledJobs[`inc${id}`] = scheduleJob(`*/${schedule.seconds_interval} * * * * *`, async () => {
      await threadNewMessage();
    });

    await prisma.scheduleIncidentZabbix.update({
      where: {
        id: Number(id)
      },
      data: {
        is_active: true
      }
    });

    return res.status(201).json({ message: `Job Disable sucessfully.` }); 
  }

  throw new NotFoundError("Schedule Not Found");

}

export { 
  update_interval_schedule_incident,
  desable_schedule_incident,
  active_schedule_incident
};
