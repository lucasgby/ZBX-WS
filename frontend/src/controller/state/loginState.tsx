import { useState } from "react";

export function LoginState() {

  const [isVisible, setIsVisible] = useState(false);

  return {
    isVisible, setIsVisible
  }
}