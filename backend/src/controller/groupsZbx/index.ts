import { create_hostgroup } from "./CREATE";
import { get_group } from "./GET";
import { alter_status_groups, update_group } from "./UPDATE";
import { delete_group, delete_more_than_groups } from "./DELETE";

export const groupsZbxController = {
  GET: { get_group },
  CREATE: { create_hostgroup},
  UPDATE: { alter_status_groups, update_group },
  DELETE: { delete_group, delete_more_than_groups }
}