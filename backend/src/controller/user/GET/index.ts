import { prisma } from "../../../database/prismaClient";

const getUserById = async (id: number) => {
  const user = await prisma.user.findUnique({
    where: {
      id
    },
  });

  return user;
}

const getUserByLogin = async (login: string) => {
  const checkUserExist = await prisma.user.findUnique({
    where: {
      login,
    }
  });

  return checkUserExist;
}