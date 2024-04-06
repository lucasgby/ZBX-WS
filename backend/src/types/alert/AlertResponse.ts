export interface AlertResponse {
  jsonrpc: string
  result: Alert[]
  id: number
}

interface Alert {
  eventid: string
  objectid: string
  clock: string
  ns: string
  name: string
  severity: string
  acknowledged: string
  r_clock: string
  r_ns: string
  acknowledges: Acknowledge[]
}

interface Acknowledge {
  userid: string
  clock: string
  message: string
}
