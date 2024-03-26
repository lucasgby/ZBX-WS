import { CONSTANTS } from "../config/server";
import { getGraphInfo } from "../controller/graphController";
import { sendMensageTrigger } from "../controller/messageController";
import { priorityIncidente } from "../model/incident";

import { getNewTrigger } from "../utils/RequestTriggers";
import converterTimestamp from "../utils/converterTimestamp";
import TIMESTAMPNOW from "../utils/timestampNow";

async function threadNewMessage(auth: string) {
  const timestampNow = TIMESTAMPNOW();

  const data = await getNewTrigger(timestampNow, auth);

  const lengthTrigger = data.result?.length;
  
  if (lengthTrigger > 0) {
    data.result?.map(async (value, index: number) => {
      const PARAMS = {
        lastchange: data?.result?.[index]?.lastchange,
        priority: data?.result?.[index]?.priority,
        triggerid: data?.result?.[index]?.triggerid,
        eventid: data?.result?.[index]?.lastEvent.eventid,
        description: data?.result?.[index]?.description,
      }
      
      const timeIncidet = converterTimestamp(PARAMS.lastchange);
      const priority = priorityIncidente(parseInt(PARAMS.priority));

      const diagnosis = `Novo incidente encontrado: ${PARAMS.triggerid}`
        + '\n' + `Descrição: *${PARAMS.description}*`
        + '\n' + `Horario: ${timeIncidet}`
        + '\n' + `Prioridade: ${priority}`
        + '\n' + `Comentários: ${value?.comments}`
        + '\n' + `Host: *${value?.hosts?.[0]?.name}*`
        + '\n\n' + `http://sede.vidatel.com.br/tr_events.php?triggerid=${PARAMS.triggerid}&eventid=${PARAMS.eventid}`;

      //const host: HostInfo = await getTagHost(parseInt(data?.result?.[index]?.hosts?.[0]?.hostid), auth);

      if (PARAMS.description.toLowerCase() === "baixa voltagem" || PARAMS.description.toLowerCase() === "alta voltagem") {
        await getGraphInfo({
          hostId: parseInt(value?.hosts?.[0]?.hostid),
          from: 'now-1h',
          message: diagnosis,
          //groupId: host?.result?.[0]?.tags[0]?.value
          groupId: `${CONSTANTS.ID_WS_GROUP}`
        });

        console.log("Mensagem enviada ao whatsapp às: ", timestampNow);
      }

      else {
        /*
        host?.result?.[0]?.tags.length > 0 ? await sendMensageTrigger(`${host?.result?.[0]?.tags[0]?.value}@g.us`, diagnosis) : () => { };
        */
        await sendMensageTrigger(`${CONSTANTS.ID_WS_GROUP}`, diagnosis);
        console.log("Mensagem enviada ao whatsapp às: ", timestampNow);
      }
    });
  }
}

export { threadNewMessage }