import { Request, Response } from "express";

import { scheduleJob, scheduledJobs } from 'node-schedule';
import { threadNewMessage } from '../../middlewares/diagnosticTrigger';
import { prisma } from "../../database/prismaClient";

const SECONDS = 1000 * 40;
/*
function listenAlert() {
  setInterval(async () => {

    try {
      await threadNewMessage();
    } catch (error) {

      console.log("Error ao enviar mensagem para o Grupo");
    }
  }, SECONDS);
}
*/

async function getScheduleIncidentById(id: number) {
  const schedule = await prisma.scheduleIncidentZabbix.findUnique({
    where: { id }
  });

  return schedule;
}

export { getScheduleIncidentById };