import { Request, Response } from "express";

import { prisma } from "../../database/prismaClient";
import { NotFoundError } from "../../model/api-errors";
import { CreateChatRequest, UpdateChatRequest, createChatSchema, updateChatSchema } from "../../model/schema/chatSchema";

const getAllChat = async (req: Request, res: Response) => {
  const { take, page } = req.body;

  const takeFormat = take ?? 20;
  const pageFormat = page ? (Number(page) - 1) * takeFormat : 0;

  const data = await prisma.chat.findMany({
    take: takeFormat,
    select: {
      chat_id: true,
      id: true,
      server: true,
      chat_name: true,
      is_active: true
    },
    skip: pageFormat
  });

  if (data) {
    return res.status(200).json({ result: data });
  }

  throw new NotFoundError("Error in List Groups");
}

const addChat = async (req: Request, res: Response) => {
  const requestData: CreateChatRequest = await createChatSchema.validate(req.body, { abortEarly: false });

  const { chat_id, chat_name, server } = requestData;

  const chat = await prisma.chat.findUnique({ where: { chat_id } });

  if (!chat) {
    await prisma.chat.create({
      data: {
        chat_id,
        chat_name,
        server
      }
    });

    return res.status(200).json({ message: "Chat is Add" });
  }

  throw new NotFoundError("Error Chat Not Found");
}

const updateChat = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const { chat_id, chat_name, server, is_active } = req.body;

  const chat = await prisma.chat.findUnique({
    where: { id: Number(id) }
  });

  if (chat) {
    await prisma.chat.update({
      where: { id: Number(id) },
      data: {
        chat_id,
        chat_name,
        is_active,
        server
      }
    });

    return res.status(204).json({ message: "Updated sucess" });
  }

  throw new NotFoundError("Error Chat Not Found");

}

const deleteChat =  async (req: Request, res: Response) => {
  const { id } = req.params;

  const chat = await prisma.chat.findUnique({
    where: { id: Number(id) }
  });

  if (chat) {
    await prisma.chat.delete({ where: { id: chat.id } });

    return res.status(200).json({ message: "Delete Chat Sucess" });
  }

  throw new NotFoundError("Error Chat Not Found");

}

export {
  getAllChat,
  addChat,
  updateChat,
  deleteChat
}