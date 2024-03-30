import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";

import { saveQRCode, deleteQRCode } from "../model/qrCodeOperations";
import { botOptions, loadGraph } from "./botController";

import { loadGroupHost } from "./hostController";

const client = new Client({
  authStrategy: new LocalAuth({
    dataPath: 'ws-session-zbx',
    clientId: 'user-zbx',
  }),
  puppeteer: {
    channel: 'chrome'
  }
});

client.once('ready', () => {
  console.log('Client is ready!');

  deleteQRCode()
});

client.on('message', async (msg) => {
  const isSolicidedGraph = msg.body.includes('/graph');
  const isSolicidedHost = msg.body.includes('/hosts-in');
  const isSolicidedGraphHost = msg.body.includes('/graph-host');

  if (isSolicidedGraph) {
    const message = msg.body.split(' ');

    await loadGraph(message[2], message[1], message[3]);
  }

  if (isSolicidedHost) {
    const message = msg.body.split(' ');

    await loadGroupHost(message[1]);
  }

  if (isSolicidedGraphHost) {
    const message = msg.body.split(' ');

    
  }

  else {
    botOptions(msg.body)
  }

});

client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
  saveQRCode(qr)
});

export { client };