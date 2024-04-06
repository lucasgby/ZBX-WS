import { Request, Response } from "express";

import { prisma } from "../database/prismaClient";
import { BadRequestError } from "../model/api-errors";
import { listCommands } from "../model/commands";

const listCommand = async (req: Request, res: Response) => {
  const data = listCommands;

  if (data) {
    return res.status(200).json({
      result: data
    });
  }

  throw new BadRequestError("Erro ao listar comandos");
}

async function listCommandFormat() {
  const data = await prisma.command.findMany();

  const message = `${data.map((value) => `*${value.command}*: ${value.description} \n\n`)}`.replace(/,/g, "");

  return message;
}

export {
  listCommand,

  listCommandFormat
}