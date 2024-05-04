import { create_new_schedule } from "./CREATE";
import { get_all_schedule } from "./GET";
import { delete_shedule } from "./DELETE";
import { alter_status_schedule } from "./UPDATE";

export const scheduleReportController = {
  GET: { get_all_schedule },
  CREATE: { create_new_schedule },
  DELETE: { delete_shedule },
  UPDATE: { alter_status_schedule }
}