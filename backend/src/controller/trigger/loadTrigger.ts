import { ReportResult, Report, TopTriggerResult } from "../../model/report";
import { getTriggerWeekly } from "../../service/fetch/requestTriggers";
import { Occurrence, Trigger } from "../../types/report";
import { TriggerResponse } from "../../types/trigger/TriggerResponse";
import { converterTimestamp } from "../../utils";
import { loadTopTrigger } from "./loadTopTrigger";

interface LoadTriggerReportProps {
  groupId: number, 
  lastChangeSince: string, 
  lastChangeTill: string
}

function countHosts(response: TriggerResponse) {
  let groupedTriggers: Trigger[] = [];
  let numberOfOccurrences: Occurrence[] = [];

  response.result.forEach((item) => {
    const index = numberOfOccurrences.findIndex((obj) => obj.description === item.description);

    if (index === -1) {
      numberOfOccurrences.push({ description: item.description, number: 1 });
      groupedTriggers.push({
        tipo: item.description, quantidade: 1, hosts: [{
          name: String(item.hosts?.[0]?.host),
          date: converterTimestamp(item.lastchange),
          triggerid: item.triggerid
        }]
      });

    } else {
      groupedTriggers[index].quantidade++;
      groupedTriggers[index].hosts.push({ name: String(item.hosts?.[0]?.host), date: converterTimestamp(item.lastchange), triggerid: item.triggerid });
    }
  });

  return { groupedTriggers };
}

async function loadTrigger({ groupId, lastChangeSince, lastChangeTill }: LoadTriggerReportProps) {
  const response = await getTriggerWeekly({ groupId, lastChangeSince, lastChangeTill });

  const triggers: ReportResult = { result: [] };
  const topTriggers: TopTriggerResult = { result: [] }

  const triggerWeekly = countHosts(response);

  await Promise.all(triggerWeekly.groupedTriggers.map(async (value) => {
    const report: Report = {
      header: {
        quantity: value.quantidade,
        title: value.tipo
      },
      hosts: []
    };

    await Promise.all(value.hosts.map(async (host) => {
      const row: [string, string, string] = [
        host.triggerid,
        host.name,
        host.date
      ];
      report.hosts.push(row);

      const top = await loadTopTrigger({ time_from: lastChangeSince, triggerid: host.triggerid });
      topTriggers.result.push(top);
      topTriggers.result.sort((a, b) => {
        const incidentsA = parseInt(a[3].text);
        const incidentsB = parseInt(b[3].text);
        return incidentsB - incidentsA;
      });
    }));

    triggers.result.push(report);
  }));

  return { triggers, topTriggers };
}

export { loadTrigger };