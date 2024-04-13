import { getAllCommands } from "@/service/fetch/command";
import { useQuery } from "@tanstack/react-query";

export function useCommand() {
  const { data, isLoading } = useQuery({
    queryKey: ['get-commands'],
    queryFn: getAllCommands
  });

  return { data, isLoading };
}