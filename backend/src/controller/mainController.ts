import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { saveQRCode, deleteQRCode } from "../model/qrCodeOperations";
import { botOptions } from "./botController";

import { loadGroupHost } from "./hostController";

import { acknowledgeEventBot, loadGraphHost } from "./bot";
import { loadGraphBot } from "./bot/graphController";
import { prisma } from "../database/prismaClient";

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'wsSessionZbx'
  }),
});

client.once('ready', async () => {
  console.log('Client is ready!');

  deleteQRCode();

  await prisma.session.create({ data: { is_connect: true, session: 'wsSessionZbx' } });
});

client.on('message', async (msg) => {
  const isSolicidedGraph = msg.body.includes('/graph');
  const isSolicidedHost = msg.body.includes('/hosts');
  const isSolicidedGraphHost = msg.body.includes('/gphost');
  const isAckEvent = msg.body.includes('/ack');

  if (isSolicidedGraph) {
    await loadGraphBot(msg);
  }

  else if (isSolicidedHost) {
    const message = msg.body.split(' ');
    if (message.length === 2) {
      msg.reply("Buscando Solicitação, Aguarde...");

      await loadGroupHost(message[1]);
    }
    else {
      msg.reply("Comando Inválido envie um groupid ou nome do grupo de hosts: Exemplo: */hosts-in 20* ou */host-in POP_N*.'");
    }
  }

  else if (isSolicidedGraphHost) {
    await loadGraphHost(msg);
  }

  else if (isAckEvent) {
    await acknowledgeEventBot(msg);
  }

  else {
    botOptions(msg)
  }

});

client.on('qr', async (qr) => {
  qrcode.generate(qr, { small: true });
  saveQRCode(qr)
});

export { client };