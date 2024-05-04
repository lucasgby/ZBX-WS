import { object, string, boolean, number } from "yup";

interface CreateChatRequest {
  chat_id: string;
  server: string;
  chat_name: string;
  organization_id: number
}

interface UpdateChatRequest {
  chat_id?: string;
  server?: string;
  chat_name?: string;
  is_active?: boolean
}

const createChatSchema = object().shape({
  chat_id: string().trim().required("Chat is Required"),
  server: string().trim().length(4).required("Server is Required"), 
  chat_name: string().trim().required("Chat Name is Required"),
  organization_id: number().required("Organization is Required")
});

const updateChatSchema = object().shape({
  chat_id: string().trim(),
  server: string().trim().length(4),
  chat_name: string().trim(),
  is_active: boolean()
});

export { CreateChatRequest, UpdateChatRequest };

export { createChatSchema, updateChatSchema };