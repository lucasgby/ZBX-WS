import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { CreateScheduleRequest, createScheduleSchema } from "../../../model/schema/scheduleSchema";
import { scheduleJob, scheduledJobs } from "node-schedule";
import { reportTriggerWeekly } from "../../report/reportController";

const create_new_schedule = async (req: Request, res: Response) => {
  const { user } = req;

  const requestData: CreateScheduleRequest = await createScheduleSchema.validate(req.body, { abortEarly: false });
  const { dayOfWeek, description, hour, minute, chat_id } = requestData;

  const report = await prisma.schedule.create({
    data: {
      hour,
      dayOfWeek,
      minute,
      description,
      user_id: Number(user.id),
      organization_id: Number(user.organization_id),
      chat_id  
    }
  });
  
  scheduledJobs[`report_${report.id}`] = scheduleJob({ hour: hour, minute: minute, dayOfWeek: dayOfWeek }, async () => {
    await reportTriggerWeekly();
  });

  return res.status(201).json({ message: "Schedule sucessfully created" });
};

export { create_new_schedule };