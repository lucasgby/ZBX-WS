import { getEventTrigger } from "../../service/fetch/requestEvent";
import { priorityIncidente } from "../../utils/priorityIncident";

interface LoadTopTriggerProps {
  triggerid: string;
  time_from: string
}

function switchPrority(priority: number) {
  let style = ''
  switch (priority) {
    case 0:
      style = 'notClassified'
      break;

    case 1:
      style = 'information'
      break;

    case 2:
      style = 'warning'
      break;

    case 3:
      style = 'average'
      break;

    case 4:
      style = 'high'
      break;

    case 5:
      style = 'disaster'
      break;
  }

  return style;
}

async function loadTopTrigger({ time_from, triggerid }: LoadTopTriggerProps) {
  const loadInfo = await getEventTrigger({ objectids: triggerid, time_from });
  const priority = priorityIncidente(Number(loadInfo.result[0].severity));

  const topTrigger: { text: string, style: string }[] = [
    { text: loadInfo.result[0].name, style: 'valueTable' },
    { text: loadInfo.result[0].hosts[0].host, style: 'valueTable' },
    { text: priority, style: switchPrority(Number(loadInfo.result[0].severity)) },
    { text: `${loadInfo.result.length}`, style: 'quantityIncident' }
  ];

  return topTrigger;
}

export { loadTopTrigger };