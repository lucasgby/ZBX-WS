import { paramsGetHostSelectTags } from "../../../apiParams/host/GET";
import { ParamsHostById } from "../../../types/host/ParamsHost";
import { apiZabbix } from "../../api/apiZabbix";

export async function getTagHost({ id }: ParamsHostById) {
  const paramsRequest = paramsGetHostSelectTags({ hostids: id });
  const { data } = await apiZabbix.post('', paramsRequest);

  return data;
}