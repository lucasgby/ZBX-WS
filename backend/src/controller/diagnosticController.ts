import { threadNewMessage } from '../middlewares/diagnosticTrigger';

const SECONDS = 1000 * 40;

export function diagnosticController() {
  setInterval(async () => {

    try {
      await threadNewMessage();
    } catch (error) {

      console.log("Error ao enviar mensagem para o Grupo");
    }
  }, SECONDS);
}