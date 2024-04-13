import { Request, Response, NextFunction } from "express";
import { prisma } from "../database/prismaClient";

export function can(permissionRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      return res.status(400).json({ message: "Usuário não existe." });
    }
/*
    const permissionExist = permissionRoutes.includes(String(permission?.tipo_usuario));

    if (!permissionExist) {
      return res.status(401).json({ message: "Não autorizado." });
    }*/

   return next();
  };
}