type CommandType = {
  description: string,
  command: Command
}

type Command = '/help' | '/graph'

const COMMANDS: CommandType[] = [
  { command: '/help', description: "Lista todos os comandos." },
  { command: '/graph', description: "Envia um gráfico de acordo com o host solicitado." }
]

export {
  COMMANDS
}