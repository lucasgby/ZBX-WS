"use client";

import { UseFormReturn } from 'react-hook-form';
import { FormModalType } from "@/types/Form/FormModalType";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input
} from "@nextui-org/react";

interface ModalFormProps<T> {
  isOpen: boolean;
  onOpenChange: () => void;
  titleModal: string;
  sendForm: () => void;
  listForm: FormModalType[];
  useFormMethods: UseFormReturn<T | any | undefined>;
  backdrop?: 'blur' | "transparent" | "opaque"
}

export function ModalForm<T>({ isOpen, onOpenChange, titleModal, listForm, sendForm, useFormMethods, backdrop }: ModalFormProps<T>) {

  const { register, formState: { errors }, handleSubmit } = useFormMethods;

  return (
    <>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        placement="top-center"
        backdrop={backdrop}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <form onSubmit={handleSubmit(sendForm)}>
                <ModalHeader className="flex flex-col gap-1">{titleModal}</ModalHeader>
                <ModalBody>
                  {listForm.map((value) => (
                    <>
                      <Input
                        key={`input-${titleModal.split(" ")}-${value.id}`}
                        autoFocus
                        endContent={
                          value.Icon ? <value.Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" /> : <></>
                        }
                        label={value.label}
                        placeholder={value.placeholder}
                        variant="bordered"
                        {...register(`${value.valueRegisterInput}`)}
                      />
                      {//@ts-ignore
                        <span className="text-red-800 text-[12px]">{errors?.[value?.valueRegisterInput]?.message}</span>
                      }
                    </>
                  ))}
                </ModalBody>

                <ModalFooter>
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>

                  <Button color="primary" type="submit">
                    Confirmar
                  </Button>
                </ModalFooter>
              </form>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}