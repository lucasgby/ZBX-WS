import { prisma } from "../../database/prismaClient";

import { criptPassword } from "../../utils";

async function createInitialUser(organization_id: number) {
  const existingUser = await prisma.user.findFirst();

  if (!existingUser) {
    const hashPassword = await criptPassword('admin', 8);

    const userData = {
      email: 'admin.nsfot@gmail.com',
      login: 'admin',
      name: 'ADMIN',
      password: hashPassword,
      role: 'super_admin',
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

export { createInitialUser };
