import { CommandResponse } from "@/types/Command/CommandResponse";
import { api } from "../api";

export async function getAllCommands() : Promise<CommandResponse> {
  const { data } = await api.get<CommandResponse>('/command/list');

  return data;
}