import { apiZabbix } from "../../api";

import { ParamsGetGraphHostById } from "../../../types/graph/ParamsTypes";
import { paramsGetGraphHostByFilter, paramsHostGetSelectGraphs } from "../../../apiParams/host/GET";
import { GraphsHostResponse } from "../../../types/host/HostReponse/GraphsHost";

async function getGraphHostById({ hostId }: ParamsGetGraphHostById): Promise<GraphsHostResponse> {
  const requestParams = paramsHostGetSelectGraphs({ hostids: hostId });

  const { data } = await apiZabbix.post<GraphsHostResponse>('', requestParams);

  return data;
}

async function getGraphHostByFilter(host: string): Promise<GraphsHostResponse> {
  const requestParams = paramsGetGraphHostByFilter({ host });

  const { data } = await apiZabbix.post<GraphsHostResponse>('', requestParams);

  return data;
}

export { getGraphHostByFilter, getGraphHostById }