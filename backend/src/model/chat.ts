import { object, string, boolean } from "yup";

interface CreateChatRequest {
  chat_id: string;
  server: string;
  chat_name: string;
}

interface UpdateChatRequest {
  chat_id: string;
  server?: string;
  chat_name?: string;
  is_active?: boolean
}

const createChatSchema = object().shape({
  chat_id: string().trim().required("Chat is Required"),
  server: string().trim().length(4).required("Server is Required"), 
  chat_name: string().trim().required("Chat Name is Required")
});

const updateChatSchema = object().shape({
  chat_id: string().trim().required(),
  server: string().trim().length(4),
  chat_name: string().trim(),
  is_active: boolean()
});

export { CreateChatRequest, UpdateChatRequest };

export { createChatSchema, updateChatSchema };