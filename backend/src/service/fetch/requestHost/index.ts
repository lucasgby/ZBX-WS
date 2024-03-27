import { paramsGetHostByGroupids, paramsGetHostFilter, paramsGetHostSearch } from "../../../apiParams/host/GET";

import { HostsResponse } from "../../../types/host/HostReponse/Hosts";
import { ParamsHostByName, ParamsHostById } from "../../../types/host/ParamsHost";

import { apiZabbix } from "../../api";

async function getHostByGroupId({ id }: ParamsHostById): Promise<HostsResponse> {
  const requestParams = paramsGetHostByGroupids({ groupids: id });

  const { data } = await apiZabbix.post<HostsResponse>('', requestParams);

  return data;
}

async function getHostFilter({ name }: ParamsHostByName): Promise<HostsResponse> {
  const requestParams = paramsGetHostFilter({ host: name });
  const { data } = await apiZabbix.post<HostsResponse>('', requestParams);

  return data;
}

async function getHostsSearch({ name }: ParamsHostByName) {
  const requestParams = paramsGetHostSearch({ host: name });

  const { data } = await apiZabbix.post<HostsResponse>('', requestParams);
  return data;
}

export { getHostByGroupId, getHostFilter, getHostsSearch };