import { groups } from "../model/groupHost";
import { Occurrence, Trigger } from "../types/report";

import { getTriggerWeekly } from "../service/fetch/requestTriggers";
import { converterTimestamp, TIMESTAMPNOW } from "../utils";

import { client } from "./mainController";
import { CONSTANTS } from "../config/server";

export async function reportTriggerWeekly() {
  try {
    const timeLastTill = TIMESTAMPNOW() //Pegar as trigger até o dia que vai rodar (Dia atualaa)
    const timeLastSice = String(Number(timeLastTill) - 604800) //pega as trigger do dia que vai rodar uma semana atras

    const dateTill = converterTimestamp(timeLastTill);
    const dateSice = converterTimestamp(timeLastSice);

    let groupedTriggers: Trigger[] = [];
    let numberOfOccurrences: Occurrence[] = [];

    groups.map(async (value, index) => {
      let configReport = `*RELATÓRIO SEMANAL ${value.local}* - ${dateSice} á ${dateTill} \n`

      const response = await getTriggerWeekly({ groupId: value.groupid, lastChangeSince: timeLastSice, lastChangeTill: timeLastTill });

      response.result.forEach((item) => {
        const index = numberOfOccurrences.findIndex((obj) => obj.description === item.description);

        if (index === -1) {
          numberOfOccurrences.push({ description: item.description, number: 1 });
          groupedTriggers.push({
            tipo: item.description, quantidade: 1, hosts: [{
              name: String(item.hosts?.[0]?.host),
              date: converterTimestamp(item.lastchange)
            }]
          });

        } else {
          groupedTriggers[index].quantidade++;
          groupedTriggers[index].hosts.push({ name: String(item.hosts?.[0]?.host), date: converterTimestamp(item.lastchange) });
        }
      });

      groupedTriggers.map((value) => {
        let formatMessage = '\n' + `Triggers do Tipo *${value.tipo}*: ${value.quantidade}` +

          '\n' + `• *Hosts envolvidos:*` + '\n'

        value.hosts.map((host) => {
          formatMessage = formatMessage + ` • *${host.name}* - ${"```"}${host.date}${"```"} ` + '\n'
        });

        configReport = configReport + formatMessage;
      });

      setTimeout(async () => {
        //await sender.clientConnneted().sendText("120363147448549852@g.us", configReport);
        await client.sendMessage(`${CONSTANTS.ID_WS_GROUP}`, configReport);
        configReport = "";
      }, 2000);

      groupedTriggers = [];
      numberOfOccurrences = [];
    });

    console.log(`Relatório enviado com sucesso... em ${dateTill}`);
  } catch (error) {
    console.log("Erro ao enviar relatório.");
  }
}