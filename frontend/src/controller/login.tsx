import { ControllerLogin } from "@/controller/function/ControllerLogin";

const controller = {
  useControllerLogin: ControllerLogin
}

export function useLoginController() {
  return {
    loginController: () => controller.useControllerLogin()
  }
}