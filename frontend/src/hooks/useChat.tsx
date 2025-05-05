import { useQuery } from "@tanstack/react-query";
import { getChat } from "@/service/fetch/chat";
import { PaginationProps } from "@/types/Pagination";

export function useChat({ page, take }: PaginationProps) {
  const { data, isLoading } = useQuery({
    queryKey: [`get-chats-${page}-${take}`],
    queryFn: () => getChat({ page, take })
  });

  return { data, isLoading };
}