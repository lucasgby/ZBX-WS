import { CommandResponse } from "@/types/CommandResponse";
import { api } from "../api";

export async function getAllCommands() : Promise<CommandResponse> {
  const { data } = await api.get<CommandResponse>('/command/list');

  return data;
}