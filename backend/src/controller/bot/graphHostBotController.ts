import WAWebJS from "whatsapp-web.js";
import { getGraphHostByFilter, getGraphHostById } from "../../service/fetch/requestGraph";

async function loadGraphHost(msg: WAWebJS.Message) {
  const message = msg.body.split(' ');

  if (message.length > 1) {
    msg.reply("Buscando Solicitação, Aguarde...");
    const typeMessage = Number(message);

    const data = !isNaN(typeMessage) ? await getGraphHostById({ hostId: typeMessage }) : await getGraphHostByFilter(`${message}`);

    if (data) {
      const formatMessage: String[] = [];

      data.result[0].graphs.map((value) => {
        formatMessage.push(`*${value.graphid}*: ${value.name}\n`);
      });

      const formartMsg = String(formatMessage).replace(/,/g, '');
      msg.reply(`*GRÁFICOS: ${data.result[0].name}*\n\n${formartMsg}`);
    }

    else {
      msg.reply("Gráficos não encontrados, verifique se o nome do Host ou ID enviado está correto.");
    }
  } else {
    msg.reply("Comando Inválido envie um groupId ou nome do grupo Exemplo: */graph-host 1534* ou */graph-host RB_Exe*");
  }
}

export { loadGraphHost };