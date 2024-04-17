import WAWebJS from "whatsapp-web.js";

import { getHostgroups } from "../../service/fetch/requestHostGroups";
import { listCommandFormat } from "../command/commandControllers";
import { loadAlert } from "../../service/fetch/requestAlert";

async function hostGroup() {
  const { result } = await getHostgroups();

  const options: String[] = [];

  result.map((value) => {
    options.push(`*${value.groupid}*.${value.name}\n`);
  });

  const formartMsg = options.toString().replace(/,/g, "");

  return formartMsg;
}

async function botOptions(msg: WAWebJS.Message) {
  const message = msg.body.trim();

  switch (message) {
    case '/help':
      const commands = await listCommandFormat();
      const message = 'Comandos disponíveis:' + '\n\n' + commands.replace(/,/g, "");
      msg.reply(message);
      break;

    case '/hostgroup':
      const BTN = await hostGroup();

      msg.reply(`*GRUPO DE HOSTS DISPONÍVEIS:*\n\n${BTN}`);

      break;

    case '/now-graph':
      msg.reply('Periodos disponível: 5m, 15m, 30m, 1h, 1d, 3h, 6h, 12h, 24h, 7d e 30d.');

      break;

    case '/alert':
      const response = await loadAlert();

      const incidentMsg = `${response.result.map((value) => 
        `Eventid: ${value.eventid}\n
        Objectid: ${value.objectid}\n
        Name: ${value.name}\n
        Prioridade: ${value.severity}\n\n`
      )}`.replace(/,/g, "");
      
      msg.reply(incidentMsg);
      break
  }
}

export { botOptions };