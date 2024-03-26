import { HostGroupsZBX } from "../../model/hostgroups";
import { apiZabbix } from "../../service/apiZabbix";

async function getHostgroups(token: string): Promise<HostGroupsZBX> {
  const { data } = await apiZabbix.post<HostGroupsZBX>('', {
    "jsonrpc": "2.0",
    "method": "hostgroup.get",
    "params": {
      "output": "extend"
    },
    "id": 1,
    "auth": token
  });
  
  return data;
}

export { getHostgroups }