import { boolean, object, string } from "yup";

interface CreateOrganization {
  description: string;
}

interface UpdateOrganization {
  description?: string;
  is_active?: boolean
}

const createOrganizationSchema = object().shape({
  description: string().trim().uppercase().required("Description is Required")
});

const updateOrganizationSchema = object().shape({
  description: string().trim().uppercase(),
  is_active: boolean()
});
;

export { CreateOrganization, UpdateOrganization };
export { createOrganizationSchema, updateOrganizationSchema };
