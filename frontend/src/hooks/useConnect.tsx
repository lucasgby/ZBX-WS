import { useQuery } from "@tanstack/react-query";

import { connectWS } from "@/service/fetch/connect_ws";

export function useConnect() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ['connect-ws'],
    queryFn: connectWS,
    enabled: false
  });

  return { data, isLoading, refetch }
}