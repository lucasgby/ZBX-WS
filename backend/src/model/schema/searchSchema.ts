import { boolean, object, string } from "yup";

interface SearchSchema {
  filter?: string;
  is_active?: boolean
}

const searchSchema = object().shape({
  filter: string().trim().uppercase(),
  is_active: boolean()
});

export { SearchSchema };
export { searchSchema }