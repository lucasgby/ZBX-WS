import { Request, Response } from "express";
import { MessageMedia } from "whatsapp-web.js";

import { getGraphHost, getGraphImage } from "../service/fetch/requestGraphImage";

import { client } from './mainController';
import { CONSTANTS } from "../config/server";
import { BadRequestError, NotFoundError } from "../model/api-errors";

type Params = {
  hostId: number;
  from: '5m' | '15m' | '30m' | '1h' | '1d' | '3h' | '6h' | '12h' | '24h' | '7d';
  message: string;
  groupId: string
}

async function sendGraph(graphid: number, from: string, message: string, name: string) {
  const responseGraph = await getGraphImage({ graphId: graphid, from });

  const buffer = Buffer.from(responseGraph?.data);
  const base64String = buffer.toString('base64');

  const media = new MessageMedia('image/png', base64String);

  const link = `http://sede.vidatel.com.br/chart2.php?graphid=${graphid}&from=now-${from}&to=now&height=200&width=500`;
  const caption = `${name}: ${from} \n\n${link}`;

  Promise.all([
    await client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, media, { caption }),
    await client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, message)
  ])
}

const getGraphInfo = async ({ hostId, from, message, groupId }: Params) => {

  try {
    const response = await getGraphHost({ hostId });
    const graph = response.result.find((value) => value.name.toLowerCase() == "tensão x uptime");

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
  getGraphInfo,
  sendGraph
}