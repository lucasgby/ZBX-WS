import { paramsGetNewTrigger, paramsGetTriggerWeekly } from "../../../apiParams/trigger/GET";
import { ParamsTriggerWeekly } from "../../../types/trigger/ParamsTrigger";
import { TriggerResponse } from "../../../types/trigger/TriggerResponse";
import { apiZabbix } from "../../api";

export async function getNewTrigger(timeStamp: string): Promise<TriggerResponse> {
  const paramsRequest = paramsGetNewTrigger(timeStamp);

  const { data } = await apiZabbix.post<TriggerResponse>('', paramsRequest);

  return data;
}

export async function getTriggerWeekly({ groupId, lastChangeSince, lastChangeTill }: ParamsTriggerWeekly) : Promise<TriggerResponse>{
  const paramsRequest = paramsGetTriggerWeekly({ groupId, lastChangeSince, lastChangeTill });
  const { data } = await apiZabbix.post<TriggerResponse>('', paramsRequest);

  return data;
}