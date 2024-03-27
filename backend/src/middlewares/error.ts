import { NextFunction, Request, Response } from "express";
import { ApiError } from "../model/interfaces/api-errors";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Erro Interno no Servidor';
  
  return res.status(statusCode).json({ message });
}