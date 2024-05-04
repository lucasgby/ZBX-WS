import { get_all_schedules } from "@/service/fetch/agend";
import { useQuery } from "@tanstack/react-query";

import { PaginationProps } from "@/types/Pagination";

export function useSchedule(input: PaginationProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`schedules-${input.id}-${input.page}-${input.take}`],
    queryFn: () => get_all_schedules(input)
  });

  return { data, isLoading };
}