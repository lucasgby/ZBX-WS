import { Request, Response } from "express";
import { UpdateUser, updateUserSchema } from "../../../model/schema/userSchema";
import { getUserByEmailAndLogin, getUserById } from "../GET";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { prisma } from "../../../database/prismaClient";
import { getOrganizationById } from "../../organization/organizationController";
import { RolesType } from "../../../model/roles";
import { SelectMoreThanStatusType, selectMoreThanStatusSchema } from "../../../model/schema/selectMoreThanSchema";

interface UpdateProps {
  id_user: number;
  data: UpdateUser;
  res: Response
}

function errorExistEmailOrLogin(email: string | undefined, login: string | undefined) {
  switch (true) {
    case (email !== undefined && login !== undefined):
      throw new BadRequestError("Email and Login already used");

    case (email !== undefined && login === undefined):
      throw new BadRequestError("Email already used");

    case (email === undefined && login === undefined):
      throw new BadRequestError("Login already used");
  }
}

async function updateUserByRoleRead({ data, id_user, res }: UpdateProps) {
  const { email, login, name } = data;

  await prisma.user.updateMany({ where: { id: id_user }, data: { email, login, name } });

  return res.status(201).json({ message: "User successfully updated" });
}

async function updateUserByRoleAdmin({ data, id_user, res }: UpdateProps) {
  const { email, login, name, is_active } = data;

  await prisma.user.updateMany({ where: { id: id_user }, data: { email, login, name, is_active } });

  return res.status(201).json({ message: "User successfully updated" });
}

async function updateUserByRoleSuperAdmin({ data, id_user, res }: UpdateProps) {
  if (data.organization_id) {
    const checkExistOrganization = await getOrganizationById(data.organization_id);

    if(!checkExistOrganization) throw new NotFoundError("Organization Not Found");
  }

  await prisma.user.updateMany({ where: { id: id_user }, data });

  return res.status(201).json({ message: "User successfully updated" });
}

const update_data_user = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { user } = req;
  const id_user = Number(id);

  const requestData: UpdateUser = await updateUserSchema.validate(req.body, { abortEarly: false });
  const data = requestData;

  const userExist = await getUserById(id_user);

  if (!userExist) {
    throw new NotFoundError("User Not Found");
  }

  if (data.email || data.login) {
    const checkUser = await getUserByEmailAndLogin(data.email, data.login);

    if (checkUser) {
      errorExistEmailOrLogin(data.email, data.login);
    }
  }

  switch (true) {
    case (user.role === RolesType.SUPER_ADMIN):
      await updateUserByRoleRead({ data, id_user, res });

    case (user.role === RolesType.ADMIN):
      await updateUserByRoleAdmin({ data, id_user, res });

    case (user.role === RolesType.USER_READ):
      await updateUserByRoleSuperAdmin({ data, id_user, res });
  };
};

const alter_status_many_users = async (req: Request, res: Response) => {
  const requestData : SelectMoreThanStatusType = await selectMoreThanStatusSchema.validate(req.body, { abortEarly: false });
  const { data, action } = requestData;

  const ids = data.map(value => value.id);

  await prisma.user.updateMany({
    where: {
      id: {
        in: ids
      },
    },
    data: {
      is_active: action
    }
  });

  return res.status(200).json({ message: "Organizations has sucessfully actives" });
}

export { update_data_user, alter_status_many_users };