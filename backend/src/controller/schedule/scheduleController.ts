import { Request, Response } from "express";
import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../model/api-errors";
import { CreateScheduleRequest, createScheduleSchema } from "../../model/schema/scheduleSchema";

async function getShedule(id: number) {
  const schedule = await prisma.schedule.findUnique({ where: { id } });

  return schedule;
}

const get_all_schedule = async (req: Request, res: Response) => {
  const schedules = await prisma.schedule.findMany();

  return res.status(200).json({ result: schedules });
};

const delete_shedule = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getShedule(Number(id));

  if (schedule) {
    await prisma.schedule.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: 'Delete Schedule Sucessfully' });
  }

  throw new NotFoundError("Schedule not Found");
};

const alter_status_schedule = async (req: Request, res: Response) => {
  const { id } = req.params;

  const schedule = await getShedule(Number(id));

  if (schedule) {
    await prisma.schedule.update({
      where: { id: schedule.id },
      data: {
        is_active: schedule.is_active ? false : true
      }
    });

    return res.status(204).json({ message: `Schedule ${schedule.is_active ? 'disable' : 'active'} Sucessfully` })
  }

  throw new NotFoundError("Schedule not Found");
};

const create_new_schedule = async (req: Request, res: Response) => {
  const { user } = req;

  const requestData: CreateScheduleRequest = await createScheduleSchema.validate(req.body, { abortEarly: false });
  const { dayOfWeek, description, hour, minute, chat_id } = requestData;

  await prisma.schedule.create({
    data: {
      hour,
      dayOfWeek,
      minute,
      description,
      user_id: user.id ?? 1,
      organization_id: user.organization_id ?? 1,
      chat_id  
    }
  });
};

export {
  get_all_schedule,
  delete_shedule,
  alter_status_schedule,
  create_new_schedule
}