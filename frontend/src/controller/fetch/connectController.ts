import { connectWS } from "@/service/fetch/connect_ws";
import { useQuery } from "@tanstack/react-query";

export function ConnectFetchController() {

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['connect-ws'],
    queryFn: connectWS,
    enabled: false
  });

  return { data, isLoading, refetch };
}