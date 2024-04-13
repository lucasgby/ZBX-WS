import { output, selectHosts } from "../output";
import { createRequestObject } from "../../../utils/createRequestObject";

export interface EventProps {
  objectids: string,
  time_from: string
}

const paramsEvent = ({ objectids, time_from }: EventProps) => {
  const params = {
    output,
    objectids, 
    time_from,
    selectHosts
  };

  const request = createRequestObject({ method: 'event.get', params });

  return request;
};

export { paramsEvent };