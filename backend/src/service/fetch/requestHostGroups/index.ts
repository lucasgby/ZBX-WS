import { paramsHostGroups } from "../../../apiParams/hostgroups/GET";
import { HostGroupsResponse } from "../../../types/hostgroup/HostGroupResponse";
import { apiZabbix } from "../../api";

async function getHostgroups(): Promise<HostGroupsResponse> {
  const requestParams = paramsHostGroups();
  const { data } = await apiZabbix.post<HostGroupsResponse>('', requestParams);
  
  return data;
}

export { getHostgroups };