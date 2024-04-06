import { output, selectAcknowledges } from "../output";
import { createRequestObject } from "../../../utils/createRequestObject";

const paramsAlert = () => {
  const params = {
    output, "recent": "true",
    "sortfield": ["eventid"],
    "sortorder": "DESC", 
    selectAcknowledges
  };

  const request = createRequestObject({ method: 'problem.get', params });

  return request;
};

export { paramsAlert };