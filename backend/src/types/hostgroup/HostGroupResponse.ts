interface HostGroupsResponse {
  jsonrpc: string;
  result: HostGroup[];
  id: number;
}

interface HostGroup {
  groupid: string;
  name: string;
  internal: string;
  flags: string;
  uuid: string;
}

export { HostGroupsResponse };