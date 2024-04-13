"use client";

import { useState } from "react";

export function useSidbar() {
  const [isOpen, setIsOpen] = useState(true);

  const handleAlterStatusSidbar = () => {
    setIsOpen(prev => !prev);
  }

  return {
    isOpen,

    handleAlterStatusSidbar
  };
}