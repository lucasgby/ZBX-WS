export interface CommandResponse {
  result: Command[]
}

interface Command {
  id: number
  description: string
  command: string
}
