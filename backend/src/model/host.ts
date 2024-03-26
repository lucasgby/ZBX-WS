export interface HostsByGroup {
  jsonrpc: string;
  result: Result[];
  id: number;
}

interface Result {
  hostid: string;
  host: string;
  status: string;
  name: string;
}

export interface GraphsHost {
  jsonrpc: string;
  result: GraphResult[];
  id: number;
}

interface GraphResult {
  hostid: string;
  host: string;
  status: string;
  name: string;
  graphs: Graph[];
}

interface Graph {
  graphid: string;
  name: string;
  width: string;
  height: string;
  templateid: string;
}