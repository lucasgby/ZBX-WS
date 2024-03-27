import { CONSTANTS } from "../config/server";
import { getGraph } from "../service/fetch/requestGraphImage";
import { getHostgroups } from "../service/fetch/requestHostGroups";
import { token } from "../utils/tokenAuth";
import { listCommandFormat } from "./commandControllers";
import { sendGraph } from "./graphController";
import { client } from "./mainController";

async function hostGroupBtns() {
  const { result } = await getHostgroups();

  const options: String[] = [];

  result.map((value) => {
    options.push(`*${value.groupid}*.${value.name} \n`);
  });

  const formartMsg = String(options).replace('/,/g', '');
  return formartMsg;
}

async function loadGraph(name: string, host: string, from?: string) {
  const data = await getGraph(name, host);

  if (data.result.length > 0) {
    const message = `Gráfico Solicitado`;

    await sendGraph(Number(data.result[0].graphid), from ?? '1h', message, data.result[0].name);
  } else {
    client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, `*GRÁFICO NÃO ENCONTRADO*`);
  }
}

async function botOptions(message: string) {
  switch (message) {
    case '/help':
      const commands = await listCommandFormat();
      const message = 'Comandos disponíveis:' + '\n\n' + commands;
      client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, message);
      break;

    case '/hostgroup':
      const BTN = await hostGroupBtns();

      client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, `*ESCOLHA UM GRUPO DE HOST PELO NUMERO:* \n\n ${BTN}`);

      break;

    case '/now-graph':
      client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, 'Periodos disponível: 5m, 15m, 30m, 1h, 1d, 3h, 6h, 12h, 24h, 7d');

      break;
  }
}

export { botOptions, loadGraph };