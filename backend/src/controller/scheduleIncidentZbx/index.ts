import { create_schedule_check_incident_zabbix } from "./CREATE";
import { active_schedule_incident, desable_schedule_incident, update_interval_schedule_incident } from "./UPDATE";
import { delete_schedule_incident_zbx } from "./DELETE";
import { get_all_schedules_check_incident, get_schedule_check_incident } from "./GET";

export const scheduleCheckIncidentController = {
  CREATE: { create_schedule_check_incident_zabbix },
  UPDATE: { active_schedule_incident, desable_schedule_incident, update_interval_schedule_incident },
  GET: { get_all_schedules_check_incident, get_schedule_check_incident },
  DELETE: { delete_schedule_incident_zbx }
}