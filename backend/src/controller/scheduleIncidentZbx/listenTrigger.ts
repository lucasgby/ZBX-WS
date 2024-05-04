import { scheduleJob, scheduledJobs } from 'node-schedule';
import { threadNewMessage } from '../../middlewares/diagnosticTrigger';
import { prisma } from "../../database/prismaClient";

async function loadSchedulesActives() {
  const schedules = await prisma.scheduleIncidentZabbix.findMany({ where: { is_active: true } });

  schedules.map(async (value) => {
    scheduledJobs[`inc${value.id}`] = scheduleJob(`*/${value.seconds_interval} * * * * *`, async () => {
      await threadNewMessage();
    });
  });
}

async function getScheduleIncidentById(id: number) {
  const schedule = await prisma.scheduleIncidentZabbix.findUnique({
    where: { id }
  });

  return schedule;
}

export { getScheduleIncidentById, loadSchedulesActives };