import venom, { create, Whatsapp } from 'venom-bot';

type QRType = {
  type: string;
  data: Buffer;
}

let client: Whatsapp | null = null;
let QR_CODE: QRType;

async function startVenomSession() {
  if (!client) {
    client = await create({
      session: 'ws-server-zbx',
    });    
  }
}

function getClient() {
  if (!client) {
    throw new Error('Sessão do Venom não iniciada.');
  }

  return client;
}

function getQrCode() {
  if (!QR_CODE) {
    throw new Error('QR Code não gerado.');
  }

  return QR_CODE;
}

export {
  startVenomSession,
  getClient,
  getQrCode
}