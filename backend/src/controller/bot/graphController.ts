import WAWebJS from "whatsapp-web.js";

import { getGraph, getGraphById } from "../../service/fetch/requestGraphImage";
import { sendGraph } from "../graph/graphController";

type ParamsGetGraph = {
  name: string;
  host?: string;
  from?: string
}

async function loadGraph({ name, from, host }: ParamsGetGraph, msg: WAWebJS.Message) {
  const data = host ? await getGraph(name, host) : await getGraphById(Number(name));

  if (data.result.length > 0) {
    const message = `Gráfico Solicitado`;

    await sendGraph(Number(data.result[0].graphid), from ?? '1h', message, data.result[0].name);
  }

  else {
    msg.reply(`*GRÁFICO NÃO ENCONTRADO*`);
  }
}

async function loadGraphBot(msg: WAWebJS.Message) {

  const message = msg.body.split(' ');

  if (message.length > 1) {
    msg.reply("Buscando Solicitação, Aguarde...");
    const typeHost = Number(message[1]);
    
    if (!isNaN(typeHost)) {
      if (message.length === 3 || message.length === 2) {
        await loadGraph({ name: message[1], from: message[2] }, msg);
      }
    } 
    
    else {
      if (message.length === 4 || message.length === 3) {
        await loadGraph({ name: message[2], from: message[3], host: message[1] }, msg);
      }
    }
  } 
  
  else {
    msg.reply("Comando Inválido envie um graphid ou nome do host junto com o gráfico desejado: */graph RB_N Tensao 1h* ou */graph 1534 1644 1h*");
  }

}

export { loadGraphBot };