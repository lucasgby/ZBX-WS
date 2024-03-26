import { threadNewMessage } from '../middlewares/diagnosticTrigger';

import { token } from '../utils/tokenAuth';

const SECONDS = 1000 * 40;

export function diagnosticController() {
  setInterval(async () => {

    try {
      await threadNewMessage(token);
    } catch (error) {

      console.log("Error ao enviar mensagem para o Grupo");
    }
  }, SECONDS);
}