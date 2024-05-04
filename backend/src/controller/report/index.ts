import { loadReport } from "./CREATE";
import { delete_report } from "./DELETE";
import { get_all_reports } from "./GET";

export const reportController = {
  CREATE: { loadReport },
  GET: { get_all_reports },
  DELETE: { delete_report }
}