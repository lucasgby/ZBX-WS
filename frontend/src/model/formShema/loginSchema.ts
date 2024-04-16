import { object, string, InferType } from "yup";

const loginSchema = object({
  login: string().required("O Campo Login é obrigatório."),
  password: string().required("O Campo Senha é obrigatório."),
});

export type LoginSchema = InferType<typeof loginSchema>

export { loginSchema };