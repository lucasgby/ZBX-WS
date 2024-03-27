import { createRequestObject } from "../../../utils/createRequestObject";
import { outputHost, selectGraphs, outputGroup, selectTags } from "../params";

import { ParamsHostGetByGroupid, ParamsHostGetById, ParamsHostGetFilter } from "../HostTypes";

const paramsHostGetSelectGraphs = ({ hostids }: ParamsHostGetById) => {
  const params = { outputHost, "hostids": hostids, selectGraphs };
  const request = createRequestObject({ method: 'host.get', params });

  return request;
};

const paramsGetGraphHostByFilter = ({ host }: ParamsHostGetFilter) => {
  const params = {
    "output": outputHost,
    "filter": {
      "host": [host]
    }, selectGraphs
  };

  const request = createRequestObject({ method: 'host.get', params });

  return request;
};

const paramsGetHostByGroupids = ({ groupids }: ParamsHostGetByGroupid) => {
  const params = {
    "output": outputHost,
    "groupids": groupids
  };

  const request = createRequestObject({ method: 'host.get', params });

  return request;
}

const paramsGetHostFilter = ({ host }: ParamsHostGetFilter) => {
  const params = {
    "output": outputHost,
    "filter": {
      "host": [host]
    }
  };

  const request = createRequestObject({ method: 'host.get', params });

  return request;
}

const paramsGetHostSearch = ({ host }: ParamsHostGetFilter) => {
  const params = {
    output: outputGroup,
    "search": {
      "name": [host]
    },
    selectGraphs
  };

  const request = createRequestObject({ method: 'host.get', params });

  return request;
}

const paramsGetHostSelectTags = ({ hostids }: ParamsHostGetById) => {
  const params = {
    "output": ["hostid"],
    "hostids": hostids,
    selectTags
  }

  const request = createRequestObject({ method: 'host.get', params });

  return request;
}

export {
  paramsHostGetSelectGraphs,
  paramsGetGraphHostByFilter,
  paramsGetHostByGroupids,

  paramsGetHostFilter,

  paramsGetHostSearch,

  paramsGetHostSelectTags
}