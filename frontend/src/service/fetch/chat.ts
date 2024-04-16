import { ChatResponse } from "@/types/Chat/ChatResponse";
import { api } from "../api";

async function getChat({ page, take }: PaginationProps) : Promise<ChatResponse>{
  const { data } = await api.post<ChatResponse>('/chat/list', {
    page,
    take
  });

  return data;
}

export {
  getChat
}