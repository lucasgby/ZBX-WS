export interface Trigger {
  jsonrpc: string;
  result:  Result[];
  id:      number;
}

export interface Result {
  triggerid:   string;
  description: string;
  status:      string;
  value:       string;
  priority:    string;
  lastchange:  string;
  comments:    string;
  type:        string;
  state:       string;
  hosts:       Host[];
  lastEvent:   LastEvent;
}

export interface Host {
  hostid: string;
  host:   string;
  name:   string;
}

export interface LastEvent {
  eventid:      string;
  source:       string;
  object:       string;
  objectid:     string;
  clock:        string;
  value:        string;
  acknowledged: string;
  ns:           string;
  name:         string;
  severity:     string;
}
