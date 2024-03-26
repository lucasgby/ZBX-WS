import { CONSTANTS } from "../../config/server";
import { ParamsGetGraphHost, ParamsGraph } from "../../model/graph";
import { Graph } from "../../model/graphHost";
import { apiZabbix } from "../../service/apiZabbix";
import { apiZabbixGraph } from "../../service/apiZabbixGraph";

import fs from "fs";

const token = CONSTANTS.TOKEN

export async function getGraphHost({ hostId }: ParamsGetGraphHost): Promise<Graph> {
  const { data } = await apiZabbix.post<Graph>('', {
    "jsonrpc": "2.0",
    "method": "graph.get",
    "params": {
      "output": "extend",
      "hostids": hostId,
      "sortfield": "name"
    },
    "auth": token,
    "id": 1
  });

  return data;
}

export async function getGraphImage({ graphId, from }: ParamsGraph) {

  try {
    const response = await apiZabbixGraph.get(`/chart2.php?graphid=${graphId}&from=${from}&to=now&height=200&width=480`, {
      responseType: "arraybuffer",
      headers: {
        Cookie: `zbx_session=${CONSTANTS.ZBX_SESSION}`,
      }
    });

    const directory = './uploads';
    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory);
    }

    const contentType = response.headers['content-type'];

    if (contentType !== 'image/png') {
      throw new Error('A resposta não contém uma imagem PNG válida');
    }

    return response; // Retorna o nome do arquivo de imagem
  } catch (error) {
    console.log(error);
  }
} 