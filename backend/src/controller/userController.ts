import { Request, Response } from "express";
import { prisma } from "../database/prismaClient";

import { BadRequestError } from "../model/api-errors";
import { CreateUser, createUserSchema } from "../model/schema/userSchema";
import { criptPassword } from "../utils";

interface GetUser {
  email?: string;
  login?: string
}

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

const createUser = async (req: Request, res: Response) => {
  const requestData: CreateUser = await createUserSchema.validate(req.body, { abortEarly: false });

  const { email, login, name, password, role, organization_id } = requestData;

  const checkExistEmailAndLogin = await prisma.user.findUnique({ where: { email, login } });

  if (checkExistEmailAndLogin) {
    throw new BadRequestError("Error Email and Login in Use");
  }

  const hashPassword = await criptPassword(password, 8);
  await prisma.user.create({
    data: {
      email: email.toLowerCase(),
      login: login.toLowerCase().replace(/\s/g, ''),
      name: name.toLowerCase(),
      password: hashPassword,
      role: role.toLowerCase(),
      organization_id: organization_id
    }
  });

  return res.status(201).json({ message: "Created User Sucessfully.", result: { login, email, role } });
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


export { getUserById, getUserByLogin, createUser, createInitialUser };
