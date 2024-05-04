import { create_organization } from "./CREATE";
import { update_organization, alter_status_organizations } from "./UPDATE";
import { get_all_organization, search_organization, get_organization } from "./GET";
import { delete_organization, delete_more_than_organization } from "./DELETE";

export const organizationController = {
  CREATE: { create_organization },
  UPDATE: { update_organization, alter_status_organizations },
  GET: {
    get_all_organization,
    search_organization,
    get_organization
  },
  DELETE: { delete_organization, delete_more_than_organization }
}