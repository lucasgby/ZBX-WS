import { scheduleJob, scheduledJobs } from "node-schedule";
import { reportTriggerWeekly } from "../report/reportController";
import { prisma } from "../../database/prismaClient";

async function loadSchedulesReportActives() {
  const schedules = await prisma.schedule.findMany({ where: { is_active: true } });

  schedules.map(async (value) => {
    scheduledJobs[`inc${value.id}`] = scheduleJob({ hour: value.hour, minute: value.minute, dayOfWeek: value.dayOfWeek }, async () => {
      await reportTriggerWeekly();
    });
  });
}

export {
  loadSchedulesReportActives
}