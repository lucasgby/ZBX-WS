import { TriggerResponse } from "../trigger/TriggerResponse"

type ParamsLoadDiagnostic = {
  data: TriggerResponse,
  index: number,
  coment: string,
  host: string
}

type ParamsSendMessage = {
  type: string,
  diagnostic: string,
  hostid: number
}

export {
  ParamsLoadDiagnostic,
  ParamsSendMessage
}