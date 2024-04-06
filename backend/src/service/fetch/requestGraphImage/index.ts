import { paramsGetGraphInFilter, paramsGetGraphHostByHostid, paramsGetGraphById } from "../../../apiParams/graph/GET";
import { CONSTANTS } from "../../../config/server";
import { GraphResponse } from "../../../types/graph/GraphResponse";
import { ParamsGetGraphHostById, ParamsGraph } from "../../../types/graph/ParamsTypes";

import { apiZabbix, apiZabbixGraph } from "../../api";

import fs from "fs";

export async function getGraphHost({ hostId }: ParamsGetGraphHostById): Promise<GraphResponse> {
  const requestParams = paramsGetGraphHostByHostid({ hostId });
  
  const { data } = await apiZabbix.post<GraphResponse>('', requestParams);

  return data;
}

export async function getGraphImage({ graphId, from }: ParamsGraph) {

  try {
    const response = await apiZabbixGraph.get(`/chart2.php?graphid=${graphId}&from=now-${from}&to=now&height=200&width=480`, {
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

export async function getGraph(name: string, host: string): Promise<GraphResponse> {
  const requestParams = paramsGetGraphInFilter({ host, name });
  const { data } = await apiZabbix.post<GraphResponse>('', requestParams);

  return data;
}

export async function getGraphById(graphids: number): Promise<GraphResponse> {
  const requestParams = paramsGetGraphById(graphids);
  const { data } = await apiZabbix.post<GraphResponse>('', requestParams);

  return data;
}3