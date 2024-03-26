import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { CONSTANTS } from "../config/server";

import { saveQRCode, deleteQRCode } from "../model/generate_qr";
import { listCommandFormat } from "./commandControllers";
import { hostGroupBtns } from "./botController";

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'ws-session-zbx'
  })
});

client.once('ready', () => {
  console.log('Client is ready!');

  deleteQRCode()
});

client.on('message', async (msg) => {
  const gpt = msg.body.includes('/gpt');

  switch (msg.body) {
    case '/help':
      const message = 'Comandos disponíveis:' + '\n\n' + listCommandFormat();
      client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, message)
      break;
    case '/graph':
      //client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, 'funcionalidade em desenvolvimento');
      const BTN = await hostGroupBtns();
      
      client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, BTN)
      
      //msg.reply(BTN.);
      break;
  }
});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  saveQRCode(qr)
});

export { client };