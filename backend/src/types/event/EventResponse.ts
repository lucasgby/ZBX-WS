export interface EventResponse {
  jsonrpc: string
  result: Result[]
  id: number
}

interface Result {
  eventid: string
  objectid: string
  clock: string
  value: string
  ns: string
  name: string
  severity: string
  r_eventid: string
  hosts: Host[]
}

interface Host {
  hostid: string
  host: string
  name: string
}
