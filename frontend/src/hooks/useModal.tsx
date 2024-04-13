"use client";

import {
  useDisclosure,
} from "@nextui-org/react";

export function useModal() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return {
    isOpen,
    onOpen,
    onOpenChange
  }
}
