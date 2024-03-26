import { apiZabbix } from "../../service/apiZabbix";

export async function getTagHost(hostid: number, token: string) {
  const { data } = await apiZabbix.post('', {
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
      "output": ["hostid"],
      "hostids": hostid,
      "selectTags": "extend"
    },
    "auth": token,
    "id": 1
  });
  return data;
}