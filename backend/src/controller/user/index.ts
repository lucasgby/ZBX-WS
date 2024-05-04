import { create_user } from "./CREATE";
import { get_all_users, get_user } from "./GET";
import { delete_user, delete_more_than_users } from "./DELETE";
import { update_data_user, alter_status_many_users } from "./UPDATE";

export const userController = {
  GET: { get_all_users, get_user  },
  UPDATE: { update_data_user, alter_status_many_users },
  DELETE: { delete_user, delete_more_than_users },
  CREATE: { create_user }
}