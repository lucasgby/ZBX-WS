import { Request, Response } from "express";

import { prisma } from "../../../database/prismaClient";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { getSheduleById } from "../GET";
import { RolesType } from "../../../model/roles";
import { scheduledJobs } from "node-schedule";

const delete_shedule = async (req: Request, res: Response) => {
  const { user } = req;

  const { id } = req.params;
  const schedule_id = Number(id);

  const schedule = await getSheduleById(schedule_id);

  if (!schedule) throw new NotFoundError("Schedule not Found");

  if (user.role === RolesType.SUPER_ADMIN) {
    await prisma.schedule.delete({ where: { id: schedule_id } });
    scheduledJobs[`report_${schedule_id}`].cancel();
    
    return res.status(200).json({ message: 'Delete Schedule Sucessfully' });
  }

  else if (user.role === RolesType.ADMIN) {
    if (user.organization_id !== schedule.organization_id) throw new BadRequestError("Organization Not Found");

    await prisma.schedule.delete({ where: { id: schedule_id } });

    return res.status(200).json({ message: 'Delete Schedule Sucessfully' });
  }

};

export {
  delete_shedule
}