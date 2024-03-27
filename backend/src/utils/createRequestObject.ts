import { CONSTANTS } from "../config/server";

interface Params {
  method: string,
  params: Record<string, any>
}

const token = `${CONSTANTS.TOKEN}`;

function createRequestObject({ method, params }: Params): Record<string, any> {
  const scrutureObject = {
    jsonrpc: '2.0',
    method: method,
    params: params,
    auth: token,
    id: 1,
  }

  return scrutureObject;
}

export { createRequestObject };