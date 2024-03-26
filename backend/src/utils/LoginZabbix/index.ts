import { apiZabbix } from "../../service/apiZabbix";

export async function login(user: string, password: string) {
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