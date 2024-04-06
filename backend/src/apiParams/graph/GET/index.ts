import { createRequestObject } from "../../../utils/createRequestObject";
import { ParamsGetGraphFilter, ParamsGetGraphHost } from "../GraphTypes";
import { output } from "../params";

const paramsGetGraphHostByHostid = ({ hostId }: ParamsGetGraphHost) => {
  const params = { output, "hostids": hostId, "sortfield": "name" };
  const request = createRequestObject({ method: 'graph.get', params });

  return request;
}

const paramsGetGraphInFilter = ({ host, name }: ParamsGetGraphFilter) => {
  const params = {
    output,
    "filter": {
      "host": [`${host}`]
    },
    "search": {
      "name": [`${name}`]
    }
  };

  const request = createRequestObject({ method: 'graph.get', params });

  return request;
}

const paramsGetGraphById = (graphids: number) => {
  const params = {
    output,
    "graphids": graphids
  };

  const request = createRequestObject({ method: 'graph.get', params });

  return request;
}

export {
  paramsGetGraphHostByHostid,
  paramsGetGraphInFilter,

  paramsGetGraphById
};
