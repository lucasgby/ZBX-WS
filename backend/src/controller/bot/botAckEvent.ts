import WAWebJS from "whatsapp-web.js";
import { acknowledgeEvent } from "../../service/fetch/requestAcknowledge";

function formatMessage(message: string) {
  let itens = message.split(" ");

  let primaryItems = itens.slice(0, 2);

  let restante = itens.slice(2).join(" ");
  primaryItems.push(restante);

  return primaryItems;
}

async function acknowledgeEventBot(msg: WAWebJS.Message) {
  const body = msg.body.split(' ');
  if (body.length > 2) {
    const message = formatMessage(msg.body);
    const data = {
      eventids: message[1],
      messageAck: message[2]
    }    

    await acknowledgeEvent({ eventids: data.eventids, message: data.messageAck });

    msg.reply(`Incidente *${message}* Reconhecido com sucesso`);
  } else {
    msg.reply('Comando inválido envie uma triggerID e uma mensagem: Exemplo: */ack 1523 Reconhecer este inciente*');
  }
}

export { acknowledgeEventBot }