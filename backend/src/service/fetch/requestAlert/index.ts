import { paramsAlert } from "../../../apiParams/alert/GET";
import { AlertResponse } from "../../../types/alert/AlertResponse";
import { apiZabbix } from "../../api";

export async function loadAlert(): Promise<AlertResponse> {
  const requestParams = paramsAlert();
  const { data } = await apiZabbix.post<AlertResponse>('', requestParams);

  return data;
}