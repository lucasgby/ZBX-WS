import { LastEvent } from "./LastEventType";
import { TriggerHostType } from "./TriggerHostType";

export interface Trigger {
  triggerid:   string;
  description: string;
  status:      string;
  value:       string;
  priority:    string;
  lastchange:  string;
  comments:    string;
  type:        string;
  state:       string;
  hosts:       TriggerHostType[];
  lastEvent:   LastEvent;
}