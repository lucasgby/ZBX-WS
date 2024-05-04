import { number, object, string } from "yup";

interface CreateScheduleRequest {
  description: string;
  hour: number;
  minute: number;
  dayOfWeek: number;
  chat_id: number
}

interface UpdateScheduleRequest {
  description: string;
  hour: number;
  minute: number;
  dayOfWeek: number;
  chat_id: number
}

const createScheduleSchema = object().shape({
  description: string().max(50).required("O campo descrição é obrigatório"),
  hour: number().required(),
  minute: number().required(),
  dayOfWeek: number().required(),
  chat_id: number().required("Informe o Chat para enviar seu relatorio")
});

const updateScheduleSchema = object().shape({
  description: string().length(50),
  hour: number(),
  minute: number(),
  dayOfWeek: number(),
  chat_id: number()
});


export { CreateScheduleRequest, UpdateScheduleRequest };

export { createScheduleSchema, updateScheduleSchema }