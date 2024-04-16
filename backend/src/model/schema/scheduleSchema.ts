import { number, object, string } from "yup";

interface CreateScheduleRequest {
  description: string;
  hour: number
  minute: number
  dayOfWeek: number
}

const createScheduleSchema = object().shape({
  description: string().length(50).required("O campo descrição é obrigatório"),
  hour: number().required(),
  minute: number().required(),
  dayOfWeek: number().required(),
});

export { CreateScheduleRequest };

export { createScheduleSchema }