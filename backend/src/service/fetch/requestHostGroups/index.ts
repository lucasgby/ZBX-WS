import { paramsGetHostGroups, paramsHostGroups } from "../../../apiParams/hostgroups/CREATE";
import { HostGroupsResponse } from "../../../types/hostgroup/HostGroupResponse";
import { apiZabbix } from "../../api";

async function getHostgroups(): Promise<HostGroupsResponse> {
  const requestParams = paramsHostGroups();
  const { data } = await apiZabbix.post<HostGroupsResponse>('', requestParams);
  
  return data;
}

async function getHostGroup(id: number): Promise<HostGroupsResponse>{
  const requestParams = paramsGetHostGroups(id);

  const { data } = await apiZabbix.post<HostGroupsResponse>('', requestParams);
  
  return data;
}

export { getHostgroups, getHostGroup };