import { Request, Response } from "express";
import { getChatById } from "../GET";
import { NotFoundError } from "../../../model/api-errors";
import { prisma } from "../../../database/prismaClient";

const delete_chat = async (req: Request, res: Response) => {
  const {id} = req.params;
  const chat_id = Number(id);

  const chat = await getChatById(chat_id);

  if (!chat) throw new NotFoundError("Chat Not Found");

  await prisma.chat.delete({ where: { id: chat_id } });

  return res.status(201).json({ message: "Chat Sucessfully deleted" });
}

export { 
  delete_chat 
};