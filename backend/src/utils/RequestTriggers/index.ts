import { TypeTrigger } from "../../model/groupHost";
import { Trigger } from "../../model/trigger";
import { apiZabbix } from "../../service/apiZabbix";

type ParamsTriggerWeekly = {
  groupId: number;
  lastChangeSince: string;
  lastChangeTill: string;
  token: string
}

export async function getNewTrigger(timeStamp: string, token: string): Promise<Trigger> {
  const { data } = await apiZabbix.post<Trigger>('', {
    "jsonrpc": "2.0",
    "method": "trigger.get",
    "params": {
      "output": [
        "triggerid",
        "description",
        "status",
        "value",
        "priority",
        "lastchange",
        "comments",
        "type",
        "state"
      ],
      "lastChangeSince": timeStamp,
      "sortfield": "priority",
      "selectHosts": [
        "hostid",
        "host",
        "name"
      ],
      "selectLastEvent": [
				"eventid",
				"objectid"
			],
      "filter": {
        "value": 1
      },
      "sortorder": "DESC"
    },
    "auth": token,
    "id": 1
  });

  return data;
}

export async function getTriggerWeekly({ groupId, lastChangeSince, lastChangeTill, token }: ParamsTriggerWeekly) : Promise<TypeTrigger>{
  const { data } = await apiZabbix.post<TypeTrigger>('', {
    "jsonrpc": "2.0",
    "method": "trigger.get",
    "params": {
      "groupids": groupId,
      "output": [
        "triggerid",
        "expression",
        "description",
        "priority",
        "lastchange",
        "status",
        "value",
        "comments",
        "type",
        "state"
      ],
      "selectHosts": [
        "hostid",
        "host",
        "name",
        "description"
      ],
      "selectAcknowledges": "extend",
      "lastChangeSince": lastChangeSince,
      "lastChangeTill": lastChangeTill,
      "sortfield": "priority",
      "sortorder": "DESC"
    },
    "auth": token,
    "id": 1
  });

  return data;
}