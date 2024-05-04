import { Request, Response, NextFunction } from "express";

export function can(permissionRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { user } = req;

    if (!user) {
      return res.status(400).json({ message: "Usuário não existe." });
    }

    const permissionExist = permissionRoutes.includes(String(user.role));

    if (!permissionExist) {
      return res.status(401).json({ message: "Usuário sem a permissão necessária." });
    }

   return next();
  };
}