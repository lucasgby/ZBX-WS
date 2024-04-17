import { number, object, string } from "yup";

interface CreateScheduleRequest {
  description: string;
  hour: number;
  minute: number;
  dayOfWeek: number;
  chat_id: number
}

const createScheduleSchema = object().shape({
  description: string().length(50).required("O campo descrição é obrigatório"),
  hour: number().required(),
  minute: number().required(),
  dayOfWeek: number().required(),
  chat_id: number().required("Informe o Chat para enviar seu relatorio")
});

export { CreateScheduleRequest };

export { createScheduleSchema }