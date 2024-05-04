import { api } from "../api";
import { PaginationProps } from "@/types/Pagination";

async function get_all_schedules(input: PaginationProps) {
  const { data } = await api.post('/schedules', {
    "id": input.id,
    "page": input.page,
    "take": input.take
  });

  return data;
}

export { get_all_schedules };