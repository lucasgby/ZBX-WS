import { number, object } from "yup";

interface PaginationSchema {
  take?: number;
  page?: number;
  id?: number
}

const paginationSchema = object().shape({
  take: number(),
  page: number(),
  id: number()
});

export { PaginationSchema };
export { paginationSchema }