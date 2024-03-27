import { createRequestObject } from "../../../utils/createRequestObject";
import { output }from "../params";

const paramsHostGroups = () => {
  const params = { output };
  const request = createRequestObject({ method: 'hostgroup.get', params });

  return request;
};

export {
  paramsHostGroups
}