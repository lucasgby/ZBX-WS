import { LoginParams } from "../../../types/login/LoginParams";
import { apiZabbix } from "../../api";

export async function login({ user, password }: LoginParams) {
  const { data } = await apiZabbix.post('',
    {
      "jsonrpc": "2.0",
      "method": "user.login",
      "params": {
        "user": user,
        "password": password
      },
      "id": 1
    });

  return data;
}