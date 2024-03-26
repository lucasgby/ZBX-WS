import { Request, Response } from "express";

import { getGraphHost, getGraphImage } from "../utils/RequestGraphImage";

import { client } from './mainController';
import { MessageMedia } from "whatsapp-web.js";
import { CONSTANTS } from "../config/server";
import { BadRequestError, NotFoundError } from "../model/api-errors";

type Params = {
  hostId: number;
  from: 'now-5m' | 'now-15m' | 'now-30m' | 'now-1h' | 'now-1d' | 'now-3h' | 'now-6h' | 'now-12h';
  message: string;
  groupId: string
}

async function sendGraph(graphid: number, from: string, message: string, name: string) {
  const responseGraph = await getGraphImage({ graphId: graphid, from });

  const buffer = Buffer.from(responseGraph?.data);
  const base64String = buffer.toString('base64');

  const media = new MessageMedia('image/png', base64String);

  const link = `http://sede.vidatel.com.br/chart2.php?graphid=${graphid}&from=${from}&to=now&height=200&width=480`;
  const caption = `${name}: ${from} \n\n${link}`;

  Promise.all([
    await client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, media, { caption }),
    await client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, message)
  ])
}

const getGraphInfo = async ({ hostId, from, message, groupId }: Params) => {

  try {
    const response = await getGraphHost({ hostId });
    const graph = response.result.find((value) => value.name === "Tensão x Uptime");

    if (graph) {
      await sendGraph(Number(graph.graphid), from, message, graph.name);
    }
  } catch (error) {
    console.log("Error ao enviar imagem");
  }
};

const graph = async (req: Request, res: Response) => {
  const { hostId, from, message } = req.body;

  const response = await getGraphHost({ hostId });
  
  if (response) {
    const graph = response.result.find((value) => value.name === "Tensão x Uptime");
    
    if (graph) {
      await sendGraph(Number(graph.graphid), from, message, graph.name);

      return res.json({ message: "Imagem enviada com sucesso." });

    } else {
      throw new NotFoundError("Gráfico não encontrado");
    }
  }

  throw new BadRequestError("Erro ao buscar gráfico.");
}

export {
  graph,
  getGraphInfo
}