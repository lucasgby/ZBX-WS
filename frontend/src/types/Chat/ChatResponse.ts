export interface ChatResponse {
  result: Chat[]
}

interface Chat {
  chat_id: string
  id: number
  server: string
  chat_name: string
  is_active: boolean
}
