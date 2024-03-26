export interface HostGroupsZBX {
  jsonrpc: string;
  result: Result[];
  id: number;
}

interface Result {
  groupid: string;
  name: string;
  internal: string;
  flags: string;
  uuid: string;
}