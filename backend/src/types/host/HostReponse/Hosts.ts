import { Host } from "../Host";

interface HostsResponse {
  jsonrpc: string;
  result: Host[];
  id: number;
}

export { HostsResponse };