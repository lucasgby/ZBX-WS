import { signIn } from "@/service/fetch/login";
import { LoginParams } from "@/types/Login/LoginParams";
import { useQuery } from "@tanstack/react-query"

export function useLogin({ login, password }: LoginParams) {
  const { data, isLoading, status, refetch } = useQuery({
    queryKey: ['login-fetch'],
    queryFn: () => signIn({ login, password }),
    enabled: false
  });

  return {
    data,
    isLoading,
    status,

    refetch
  }
}