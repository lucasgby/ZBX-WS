import { prisma } from "../../database/prismaClient";
import { RolesType } from "../../model/roles";

import { criptPassword } from "../../utils";

async function getUserByLogin(login: string) {
  const user = await prisma.user.findUnique({ where: { login } });

  return user;
}

async function createInitialUser(organization_id: number) {
  const existingUser = await prisma.user.findFirst();

  if (!existingUser) {
    const hashPassword = await criptPassword('admin', 8);

    const userData = {
      email: 'admin.nsfot@gmail.com',
      login: 'admin',
      name: 'ADMIN',
      password: hashPassword,
      role: RolesType.SUPER_ADMIN,
      organization_id: organization_id
    };

    await prisma.user.create({
      data: userData
    });

    console.log('Initial user created');
    return;
  }
  console.log('Initial User has Created');
};

export { createInitialUser, getUserByLogin };
