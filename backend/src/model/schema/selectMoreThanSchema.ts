import { array, boolean, number, object } from "yup"

interface SelectMoreThanType {
  data: { id: number }[]
}

interface SelectMoreThanStatusType extends SelectMoreThanType {
  action: boolean;
}

const selectMoreThanSchema = object().shape({
  data: array().of(
    object().shape({
      id: number().required("Provide an array with the organization ids")
    })
  ).required()
});

const selectMoreThanStatusSchema = object().shape({
  action: boolean().required("Action is required"),
  data: array().of(
    object().shape({
      id: number().required("Provide an array with the organization ids")
    })
  ).required()
});

export { SelectMoreThanType, SelectMoreThanStatusType };
export { selectMoreThanSchema, selectMoreThanStatusSchema };
