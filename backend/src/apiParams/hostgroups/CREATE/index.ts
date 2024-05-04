import { createRequestObject } from "../../../utils/createRequestObject";
import { output } from "../params";

const paramsHostGroups = () => {
  const params = { output };
  const request = createRequestObject({ method: 'hostgroup.get', params });

  return request;
};

const paramsGetHostGroups = (id: number) => {
  const params = {
    output,
    "groupids": id
  }
  const request = createRequestObject({ method: 'hostgroup.get', params });

  return request;
}

export {
  paramsHostGroups,
  paramsGetHostGroups
}