import { Request, Response } from "express";
import { CreateUser, createUserSchema } from "../../../model/schema/userSchema";
import { prisma } from "../../../database/prismaClient";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { criptPassword } from "../../../utils";
import { getUserByEmailAndLogin } from "../GET";
import { getOrganizationById } from "../../organization/organizationController";
import { RolesType } from "../../../model/roles";

const create_user = async (req: Request, res: Response) => {
  const { user } = req;
  const requestData: CreateUser = await createUserSchema.validate(req.body, { abortEarly: false });

  const { email, login, name, password, role, organization_id } = requestData;

  const checkExistEmail = await getUserByEmailAndLogin(email, undefined);
  const checkExistLogin = await getUserByEmailAndLogin(undefined, login);

  if (checkExistEmail) {
    throw new BadRequestError("Error Email in Use");
  }

  if (checkExistLogin) {
    throw new BadRequestError("Error Login in Use");
  }

  const checkExistOrganization = await getOrganizationById(organization_id);

  if (checkExistOrganization) {
    const hashPassword = await criptPassword(password, 8);

    await prisma.user.create({
      data: {
        email: email.toLowerCase(),
        login: login.toLowerCase().replace(/\s/g, ''),
        name: name.toLowerCase(),
        password: hashPassword,
        role: role.toLowerCase(),
        organization_id: String(user.role) === RolesType.SUPER_ADMIN ? organization_id : Number(user.organization_id)
      }
    });

    return res.status(201).json({ message: "Created User Sucessfully.", result: { login, email, role, name } });
  }

  throw new NotFoundError("Organization Not Found");
}

export { create_user };