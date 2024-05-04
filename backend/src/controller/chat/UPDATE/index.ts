import { Request, Response } from "express";
import { getChatById } from "../GET";
import { prisma } from "../../../database/prismaClient";
import { NotFoundError } from "../../../model/api-errors";
import { UpdateChatRequest, updateChatSchema } from "../../../model/schema/chatSchema";

const update_chat = async (req: Request, res: Response) => {
  const { id } = req.params;
  const chat_db_id = Number(id);

  const requestData: UpdateChatRequest = await updateChatSchema.validate(req.body, { abortEarly: false });
  const { chat_id, chat_name, is_active, server } = requestData;

  const chat = await getChatById(chat_db_id);

  if (!chat) throw new NotFoundError("Error Chat Not Found");

  await prisma.chat.update({
    where: { id:chat_db_id },
    data: {
      chat_id,
      chat_name,
      is_active,
      server
    }
  });

  return res.status(204).json({ message: "Updated sucess" });
}

export {
  update_chat
}