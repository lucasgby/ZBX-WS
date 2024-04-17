import { Request, Response } from "express";
import { CreateUser, createUserSchema } from "../../../model/schema/userSchema";
import { prisma } from "../../../database/prismaClient";
import { BadRequestError } from "../../../model/api-errors";
import { criptPassword } from "../../../utils";

const create_user = async (req: Request, res: Response) => {
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

export { create_user };