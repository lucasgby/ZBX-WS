import { FormModalType } from "@/types/FormModalType";

const inputOptions = (value?: string) => {
  const data: FormModalType[] = [
    {
      id: 1,
      label: 'Descrição',
      placeholder: 'Descrição do agendamento',
      type: 'text',
      valueRegisterInput: value,
    }
  ]

  return data;
}

export {
  inputOptions
};