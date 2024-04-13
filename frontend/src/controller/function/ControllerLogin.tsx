import { LoginState } from "@/controller/state/loginState"

export function ControllerLogin() {
  const { isVisible, setIsVisible } = LoginState();
  
  const toggleVisibility = () => setIsVisible(prev => !prev);

  const state = {
    isVisible
  }

  return {
    state,

    toggleVisibility
  }
}