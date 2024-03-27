import { ParamsTriggerWeekly } from "../../../types/trigger/ParamsTrigger";
import { createRequestObject } from "../../../utils/createRequestObject";
import { output, selectHosts, selectLastEvent, selectAcknowledges } from "../params";

const paramsGetNewTrigger = (timeStamp: string) => {
  const params = {
    output,
    "lastChangeSince": timeStamp,
    "sortfield": "priority",
    selectHosts,
    selectLastEvent,
    "filter": {
      "value": 1
    },
    "sortorder": "DESC"
  }

  const request = createRequestObject({ method: 'trigger.get', params });

  return request;
}

const paramsGetTriggerWeekly = ({ groupId, lastChangeSince, lastChangeTill }: ParamsTriggerWeekly) => {
  const params = {
    output,
    "groupids": groupId,
    selectHosts,
    selectAcknowledges,
    "lastChangeSince": lastChangeSince,
    "lastChangeTill": lastChangeTill,
    "sortfield": "priority",
    "sortorder": "DESC"
  }

  const request = createRequestObject({ method: 'trigger.get', params });

  return request;
}

export { paramsGetNewTrigger, paramsGetTriggerWeekly };