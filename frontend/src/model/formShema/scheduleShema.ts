import { InferType, object, string } from "yup";

const scheduleSchema = object({
  description: string().required("O Campo Código descrição é obrigatório."),
});

export type ScheduleSchema = InferType<typeof scheduleSchema>

export {
  scheduleSchema
}