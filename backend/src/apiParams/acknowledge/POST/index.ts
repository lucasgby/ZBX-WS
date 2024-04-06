import { createRequestObject } from "../../../utils/createRequestObject";

const paramsAcknowledge = ({ message, eventids }: Omit<ParamsAcknowledge, "action">) => {
  const params = { eventids, action: 6, message };
  const request = createRequestObject({ method: 'event.acknowledge', params });

  return request;
}

export { paramsAcknowledge };