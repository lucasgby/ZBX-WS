import { boolean, number, object, string } from "yup";

interface CreateHostGroup {
  group_host_id: number;
  description: string;
  id_g_ws: string;
  hostid: number;
  organization_id: number
};

interface UpdateHostGroup {
  group_host_id?: number;
  description?: string;
  id_g_ws?: string;
  hostid?: number;
  is_active?: boolean
}

const createHostGroupSchema = object().shape({
  group_host_id: number().required("HostGroup Is Required"),
  description: string().trim().uppercase().required("Description Is Required"),
  id_g_ws: string().trim().required("Id the WS Chat Is Required"),
  hostid: number().required("HostId Is Required"),
  organization_id: number().required("Organization Is Required"),
  is_active: boolean()
});

const updateHostGroupSchema = object().shape({
  group_host_id: number(),
  description: string().trim().uppercase(),
  id_g_ws: string().trim(),
  hostid: number(),
  organization_id: number()
});

export { CreateHostGroup, UpdateHostGroup };
export { createHostGroupSchema, updateHostGroupSchema }