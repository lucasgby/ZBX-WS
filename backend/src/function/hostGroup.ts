import { CONSTANTS } from "../config/server";
import { getHostByGroupId, getHostFilter } from "../service/fetch/requestHost";
import { client } from "../controller/mainController";

async function loadGroupHost(message: string | number) {
  const typeMessage = Number(message);

  const data = !isNaN(typeMessage) ? await getHostByGroupId({ id: typeMessage }) : await getHostFilter({ name: String(message) });

  if (data) {
    const formatMessage: String[] = [];

    data.result.map((value) => {
      formatMessage.push(`*${value.hostid}*: ${"`"}${value.host}${"`"}\n`)
    });

    const formartMsg = String(formatMessage).replace(/,/g, '');
    client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, `*HOSTS DO GRUPO*\n\n${formartMsg}`);
  }

  else {
    client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, "Host não encontrados, verifique se o nome do Grupo ou ID enviado estão corretos.");
  }
}

export { loadGroupHost };