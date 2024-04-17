import { Request, Response } from 'express';

import { getUserByLogin } from "../user/userController";

import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

import { BadRequestError, NotFoundError } from '../../model/api-errors';

import { CONSTANTS } from '../../config/server';

export const login = async (req: Request, res: Response) => {
  const { login, password } = req.body;

  const user = await getUserByLogin(login);

  if (!user) {
    throw new NotFoundError("User Not Found.");
  }

  if (user.is_active === false) {
    throw new BadRequestError("User Inactive.");
  }

  const verifyPassword = await bcrypt.compare(password, user.password);

  if (!verifyPassword) {
    throw new BadRequestError("Login or password invalid.");
  }

  const token = jwt.sign({ id: user.id }, CONSTANTS.PWT_PASS ?? '', { expiresIn: '7d' });

  return res.status(200).json({
    result: {
      id: user.id,
      name: user.name,
      organization: user.organization_id,
      is_active: user.is_active,
      email: user.email,
      role: user.role,
      token
    }
  });
};
