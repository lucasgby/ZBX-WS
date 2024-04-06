import { paramsAcknowledge } from "../../../apiParams/acknowledge/POST";
import { apiZabbix } from "../../api";

async function acknowledgeEvent({ eventids, message }: Omit<ParamsAcknowledge, "action">) {
  const requestAck = paramsAcknowledge({ eventids, message });

  const { data } = await apiZabbix.post('', requestAck);

  return data;
}

export { acknowledgeEvent };