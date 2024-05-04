import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { NotFoundError } from "../../../model/api-errors";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { formatPagination } from "../../../model/configPagination";

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
  });

  return user;
};

const getUserByEmailAndLogin = async (email: string | undefined, login: string | undefined) => {
  const checkExistEmailAndLogin = await prisma.user.findUnique({
    where: {
      email,
      login
    }
  });

  return checkExistEmailAndLogin
}

const get_user = async (req: Request, res: Response) => {
  const { id } = req.params;

  const user = await getUserById(Number(id));

  if (user) {
    const { password: pass, passwordResetExpires: resetExpires, passwordResetToken: resetToken, ...partialUser } = user;

    return res.status(200).json({ result: partialUser });
  }

  throw new NotFoundError("User Not Found");
};

const get_all_users = async (req: Request, res: Response) => {
  const { id } = req.params;

  const requestPagination: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { take, page } = requestPagination;

  const { pagination } = formatPagination({ page, take });

  const [users, totalCount] = await Promise.all([
    await prisma.user.findMany({
      where: {
        organization_id: Number(id)
      },
      skip: pagination.page,
      take: pagination.take,

      select: {
        password: false,
        passwordResetExpires: false,
        passwordResetToken: false,
        shedules: false,
        createdAt: true,
        email: true,
        id: true,
        is_active: true,
        login: true,
        name: true,
        organization_id: true,
        role: true,
        updatedAt: true
      }
    }),

    prisma.organization.count()
  ]);

  return res.status(200).json({
    result: users,
    _count: { itens: totalCount }
  });
};

export { get_user, get_all_users, getUserById, getUserByEmailAndLogin };