import { HostsByGroup, GraphsHost } from "../../model/host";
import { apiZabbix } from "../../service/apiZabbix";

async function getHostByGroupId(groupids: number, token: string): Promise<HostsByGroup> {
  const { data } = await apiZabbix.post<HostsByGroup>('', {
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
      "output": [
        "hostid",
        "host",
        "status",
        "name"
      ],
      "groupids": groupids
    },
    "auth": token,
    "id": 1
  });
  return data;
}

async function getHostFilter(host: number, token: string): Promise<HostsByGroup> {
  const { data } = await apiZabbix.post<HostsByGroup>('', {
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
      "output": "extend",
      "filter": {
        "host": host
      }
    },
    "auth": token,
    "id": 1
  });
  return data;
}

async function getGraphHost(hostids: number, token: string): Promise<GraphsHost> {
  const { data } = await apiZabbix.post<GraphsHost>('', {
    "jsonrpc": "2.0",
    "method": "host.get",
    "params": {
      "output": [
        "hostid",
        "host",
        "status",
        "name"
      ],
      "hostids": hostids,
      "selectGraphs": [
        "graphid",
        "name",
        "width",
        "height",
        "templateid"
      ]
    },
    "auth": token,
    "id": 1
  });
  return data;
}

export { getHostByGroupId, getGraphHost, getHostFilter };