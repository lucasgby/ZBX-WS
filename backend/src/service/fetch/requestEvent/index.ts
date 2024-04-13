import { EventProps, paramsEvent } from "../../../apiParams/event/GET";
import { EventResponse } from "../../../types/event/EventResponse";
import { apiZabbix } from "../../api";

export async function getEventTrigger({ objectids, time_from }: EventProps): Promise<EventResponse> {
  const requestParams = paramsEvent({ objectids, time_from });

  const { data } = await apiZabbix.post<EventResponse>('', requestParams);

  return data;
}