import { number, object } from "yup";

interface PaginationSchema {
  take?: number;
  page?: number;
}

const paginationSchema = object().shape({
  take: number(),
  page: number()
});

export { PaginationSchema };
export { paginationSchema }