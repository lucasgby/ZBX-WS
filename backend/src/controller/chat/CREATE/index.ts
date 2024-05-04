import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { CreateChatRequest, createChatSchema } from "../../../model/schema/chatSchema";
import { BadRequestError, NotFoundError } from "../../../model/api-errors";
import { getChatByChatId } from "../GET";
import { RolesType } from "../../../model/roles";
import { getOrganizationById } from "../../organization/organizationController";

interface Props {
  data: CreateChatRequest;
  res: Response
}

async function createChat({ data, res }: Props) {
  await prisma.chat.create({
    data
  });

  return res.status(200).json({ message: "Chat successfully added" });
}

const create_chat = async (req: Request, res: Response) => {
  const { user } = req;
  const requestData: CreateChatRequest = await createChatSchema.validate(req.body, { abortEarly: false });

  const { chat_id, chat_name, server, organization_id } = requestData;

  const chat = await getChatByChatId(chat_id);

  if (chat) throw new NotFoundError("Existing Chat");

  const checkOrganization = await getOrganizationById(organization_id);

  if (!checkOrganization) throw new NotFoundError("Organization Not Found");

  if (user.role === RolesType.SUPER_ADMIN) {
    await createChat({ data: { chat_id, chat_name, organization_id, server }, res })
  }

  if (user.organization_id !== organization_id) {
    throw new BadRequestError("Organization not Found");
  }

  await createChat({ data: { chat_id, chat_name, organization_id: Number(user.organization_id), server }, res });

}

export { create_chat }