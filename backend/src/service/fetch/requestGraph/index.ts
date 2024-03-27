import { apiZabbix } from "../../api";

import { ParamsGetGraphHostById } from "../../../types/graph/ParamsTypes";
import { GraphResponse } from "../../../types/graph/GraphResponse";
import { paramsGetGraphHostByFilter, paramsHostGetSelectGraphs } from "../../../apiParams/host/GET";
import { GraphsHostResponse } from "../../../types/host/HostReponse/GraphsHost";

async function getGraphHostById({ hostId }: ParamsGetGraphHostById): Promise<GraphsHostResponse> {
  const requestParams = paramsHostGetSelectGraphs({ hostids: hostId });

  const { data } = await apiZabbix.post<GraphsHostResponse>('', requestParams);

  return data;
}

async function getGraphHostByFilter(host: string): Promise<GraphResponse> {
  const requestParams = paramsGetGraphHostByFilter({ host });

  const { data } = await apiZabbix.post<GraphResponse>('', requestParams);

  return data;
}

export { getGraphHostByFilter, getGraphHostById }