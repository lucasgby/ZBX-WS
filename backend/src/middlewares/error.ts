import { NextFunction, Request, Response } from "express";
import { ApiError } from "../model/api-errors";
import { ValidationError } from "yup";

export const errorMiddleware = (
  error: Error & Partial<ApiError>,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof ValidationError) {
    const statusCode = 400; 

    const message = error.errors.join("; ");
    return res.status(statusCode).json({ message });
  }
  
  const statusCode = error.statusCode ?? 500;
  const message = error.statusCode ? error.message : 'Erro Interno no Servidor';
  
  return res.status(statusCode).json({ message });
}