import { Request, Response, NextFunction } from "express";

import jwt from "jsonwebtoken";

import { BadRequestError, UnauthorizedError } from "../model/api-errors";
import { getUserById } from "../controller/user/GET";
import { CONSTANTS } from "../config/server";

type JwtPayload = {
  id: number;
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {

  const { authorization } = req.headers;

  if (!authorization) {
    throw new UnauthorizedError("Não autorizado.");
  }

  const token = authorization.split(' ')[1];

  const { id } = jwt.verify(token, CONSTANTS.PWT_PASS ?? '') as JwtPayload;

  const user = await getUserById(id);

  if (!user) {
    throw new UnauthorizedError("Não autorizado.");
  }

  if(user.is_active === false) {
    throw new BadRequestError("User Inactive.");
  }

  const { password: _, ...userLogin } = user;

  req.user = userLogin;

  next();
}