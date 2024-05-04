import { Request, Response } from "express";

import { prisma } from "../../../database/prismaClient";
import { BadRequestError, NotFoundError, UnauthorizedError } from "../../../model/api-errors";
import { getSheduleById } from "../GET";
import { RolesType } from "../../../model/roles";

interface Props {
  id: number;
  res: Response;
  current_status: boolean
}

async function alterStatusSchedule({ current_status, id, res }: Props) {
  await prisma.schedule.update({
    where: { id },
    data: {
      is_active: current_status ? false : true
    }
  });

  return res.status(204).json({ message: `Schedule ${current_status ? 'disable' : 'active'} Sucessfully` });
}

const update_schedule_report = async (req: Request, res: Response) => {
  
};

const alter_status_schedule = async (req: Request, res: Response) => {
  const { user } = req;

  const { id } = req.params;
  const schedule_id = Number(id);

  const schedule = await prisma.schedule.findUnique({
    where: {
      id: schedule_id,
      organization_id: user.role === RolesType.SUPER_ADMIN ? undefined : user.organization_id
    }
  })

  if (!schedule) throw new NotFoundError("Schedule not Found");

  await prisma.schedule.update({
    where: { id: schedule_id },
    data: {
      is_active: schedule.is_active ? false : true
    }
  });

  return res.status(204).json({ message: `Schedule ${schedule.is_active ? 'disable' : 'active'} Sucessfully` });
};

export {
  alter_status_schedule
}