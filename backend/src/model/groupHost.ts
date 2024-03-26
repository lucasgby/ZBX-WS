export interface TypeTrigger {
  jsonrpc: string;
  result: {
      triggerid: string;
      expression: string;
      description: string;
      priority: string;
      lastchange: string;
      status: string;
      value: string;
      comments: string;
      type: string;
      state: string;
      hosts: {
          hostid: string;
          host: string;
          name: string;
          description: string;
      }[];
  }[]
  id: number;
}

export const groups = [
  { groupid: 34, local: "AGUA BRANCA", id_g_ws: "558199626363-1589826430", hostid: 10642 },
  { groupid: 43, local: "BARRA", id_g_ws: "558199626363-1592919241", hostid: 10669 },
  { groupid: 35, local: "BERNARDO VIEIRA", id_g_ws: "558199626363-1591665563", hostid: 10670 },
  { groupid: 20, local: "CAIÇARINHA", id_g_ws: "558199626363-1593801557", hostid: 10667 },
  { groupid: 44, local: "CIPÓ", id_g_ws: "558199626363-1589222674", hostid: 10687 },
  { groupid: 46, local: "GILDO", id_g_ws: "558171191122-1589306392", hostid: 10708 },
  { groupid: 47, local: "INGAZEIRA", id_g_ws: "558199626363-1589652241", hostid: 10709 },
  { groupid: 48, local: "LOGRADOURO", id_g_ws: "558199626363-1590155691", hostid: 10710 },
  { groupid: 49, local: "MALHADA DA PEDRA", id_g_ws: "558199626363-1593602031", hostid: 107011 },
  { groupid: 32, local: "POP SERRA", id_g_ws: "558199626363-1589306607", hostid: 10735 },
  { groupid: 51, local: "POP RAMALHETE", id_g_ws: "558199626363-1588170179", hostid: 10737 },
  { groupid: 38, local: "SACO DA ROÇA", id_g_ws: "120363032873069032", hostid: 10778 },
  { groupid: 39, local: "SERRA DO BRABO", id_g_ws: "", hostid: 10779 },
  { groupid: 40, local: "SERRA VERMELHA", id_g_ws: "558781641679-1634315402", hostid: 10780 },
  { groupid: 52, local: "SÃO JOÃO DO BARRO VERMELHO", id_g_ws: "558199626363-1590793181", hostid: 10863 },
  { groupid: 29, local: "SÃO MIGUEL", id_g_ws: "558199626363-1589290877", hostid: 10813 },
  { groupid: 24, local: "VARZINHA", id_g_ws: "558199626363-1586736284", hostid: 10586 },
  { groupid: 42, local: "XIQUE XIQUE", id_g_ws: "", hostid: 10740 },
  { groupid: 57, local: "SANTA CLARA", id_g_ws: "558799190688-1546001161", hostid: 0 },
]