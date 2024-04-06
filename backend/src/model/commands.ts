export const listCommands = [
  { command: "/help", description: 'Lista todos os comandos existentes.' },
  { command: "/graph", description: 'Envia um Grafico existente do Zabbix de acordo com o Host ou Id, Nome do Gráfico ou ID do gráfico e periodo solicitado, \n\n Exemplo: */graph RB_N Tensao 1h* ou */graph 1534 1h* \n O primeiro parametro é o *Hostid* e o *Segundo:* graphId.' },
  { command: "/now-graph", description: 'Periodos de tempos suportados para busca de gráficos: 5m, 15m, 30m, 1h, 1d, 3h, 6h, 12h, 24h, 7d ou 30d' },
  { command: "/hostgroup", description: 'Mostra todos os grupos de Hosts Ativos. \n\n Exemplo: */hostgroup*.' },
  { command: "/hosts", description: 'Mostra todos os hosts de um Grupo selecionando seu *groupId* ou *nome*. \n\n Exemplo: */hosts 20* ou */host POP_N*.' },
  { command: "/gphost", description: 'Lista todos os gráficos que o host selecionado pelo *hostid* ou *nome* tem. \n\n Exemplo: */gphost 1534* ou */gphost RB_Exe*.' },
  { command: "/alert", description: 'Envia os incidentes com status ativo' },
  { command: "/ack", description: 'Reconhece um incidente com uma mensagem, é necessário enviar o ID do Incidente. Exemplo: */ack 1505 reconhecer incidente*' }
]