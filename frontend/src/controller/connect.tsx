import { ConnectFetchController } from "@/controller/fetch/connectController";

const controller = {
  useFetch: ConnectFetchController
}

function useConnectController() {
  return {
    connectFetch: () => controller.useFetch()
  }
}

export {
  useConnectController
}