import { LoginParams } from "@/types/Login/LoginParams";
import { api } from "../api";

export async function signIn({ login, password }: LoginParams) {
  const { data } = await api.post('/login', {
    login,
    password
  });

  return data;
}