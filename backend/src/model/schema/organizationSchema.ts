import { array, boolean, number, object, string } from "yup";

interface CreateOrganization {
  description: string;
}

interface UpdateOrganization {
  description?: string;
  is_active?: boolean
}

interface SelectMoreThanOrganization {
  data: { id: number }[]
}

const createOrganizationSchema = object().shape({
  description: string().trim().uppercase().required("Description is Required")
});

const updateOrganizationSchema = object().shape({
  description: string().trim().uppercase(),
  is_active: boolean()
});

const selectMoreThanOrganization = object().shape({
  data: array().of(
    object().shape({
      id: number().required("Provide an array with the organization ids")
    })
  ).required()
});

export { CreateOrganization, UpdateOrganization, SelectMoreThanOrganization };
export { createOrganizationSchema, updateOrganizationSchema, selectMoreThanOrganization };
