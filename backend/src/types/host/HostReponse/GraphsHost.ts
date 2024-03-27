import { Host } from "../Host";

interface GraphsHostResponse {
  jsonrpc: string;
  result: HostSelectGraph[];
  id: number;
}

interface HostSelectGraph extends Host {
  graphs: Graph[];
}

interface Graph {
  graphid: string;
  name: string;
  width: string;
  height: string;
  templateid: string;
}

export { GraphsHostResponse };