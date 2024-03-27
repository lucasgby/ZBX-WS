import { Request, Response } from "express";

import { prisma } from "../database/prismaClient";
import { BadRequestError } from "../model/api-errors";

const commandGenerate = async (req: Request, res: Response) => {
  const data = await prisma.command.findUnique({
    where: {
      command: '/help'
    }
  });

  if (data) {
    return res.status(500).json({ message: "Comandos já iniciados" });
  }

  await prisma.command.createMany({
    data: [
      { command: "/help", description: 'Lista todos os comandos existentes' },
      { command: "/graph", description: 'Envia um Grafico existente do Zabbix de acordo com o Host e Nome do Gráfico e periodo solicitado' },
      { command: "/now-graph", description: 'Periodos de tempos suportados para busca de gráficos: 5m, 15m, 30m, 1h, 1d, 3h, 6h, 12h, 24h, 7d' },
      { command: "/hostgroup", description: 'Mostra todos os grupos de Hosts Ativos' },
      { command: "/hosts", description: 'Mostra todos os hosts de um Grupo de Hosts' },
    ]
  });
}

const listCommand = async (req: Request, res: Response) => {
  const data = await prisma.command.findMany();

  if (data) {
    return res.status(200).json({
      result: data
    });
  }

  throw new BadRequestError("Erro ao listar comandos");
}

async function listCommandFormat() {
  const data = await prisma.command.findMany();

  const message = data.map((value) => `${value.command}: ${value.description} \n`)

  return message;
}

export {
  commandGenerate,
  listCommand,

  listCommandFormat
}