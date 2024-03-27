import { Trigger } from "./Trigger";

export interface TriggerResponse {
  jsonrpc: string;
  result:  Trigger[];
  id:      number;
}