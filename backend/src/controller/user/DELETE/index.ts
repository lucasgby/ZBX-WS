import { Request, Response } from "express";
import { getUserById } from "../GET";
import { NotFoundError } from "../../../model/api-errors";
import { prisma } from "../../../database/prismaClient";
import { SelectMoreThanType, selectMoreThanSchema } from "../../../model/schema/selectMoreThanSchema";

const delete_user = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(Number(id));

  if (user) {
    await prisma.user.delete({ where: { id: Number(id) } });

    return res.status(200).json({ message: "User has successfully deleted." })
  }

  throw new NotFoundError("User Not Found");
};

const delete_more_than_users = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanType = await selectMoreThanSchema.validate(req.body, { abortEarly: false });
  const { data } = requestData;

  const ids = data.map(value => value.id);

  await prisma.user.deleteMany({
    where: {
      id: {
        in: ids
      }
    }
  });

  return res.status(200).json({ message: "Users has sucessfully deleted" });
};

export { delete_user, delete_more_than_users };