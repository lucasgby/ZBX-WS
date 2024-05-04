import { Request, Response } from "express";
import { prisma } from "../../../database/prismaClient";
import { PaginationSchema, paginationSchema } from "../../../model/schema/paginationSchema";
import { NotFoundError } from "../../../model/api-errors";
import { formatPagination } from "../../../model/configPagination";
import { RolesType } from "../../../model/roles";
import { SearchSchema, searchSchema } from "../../../model/schema/searchSchema";

async function getChatById(id: number) {
  const chat = await prisma.chat.findUnique({ where: { id } });

  return chat;
}

async function getChatByChatId(chat_id: string) {
  const chat = await prisma.chat.findUnique({ where: { chat_id } });

  return chat;
}

const get_all_chats = async (req: Request, res: Response) => {
  const { user } = req;

  const requestData: PaginationSchema = await paginationSchema.validate(req.body, { abortEarly: false });
  const { id, page, take } = requestData;
  const { pagination } = formatPagination({ page, take });

  const [chats, totalCount] = await Promise.all([
    await prisma.chat.findMany({
      where: {
        organization_id: Number(user.role === RolesType.SUPER_ADMIN) ? Number(id) : Number(user.organization_id)
      },
      take: pagination.take,
      select: {
        chat_id: true,
        id: true,
        server: true,
        chat_name: true,
        is_active: true
      },
      skip: pagination.page
    }),

    prisma.chat.count({
      where: {
        organization_id: Number(user.role === RolesType.SUPER_ADMIN) ? Number(id) : Number(user.organization_id)
      }
    })
  ])

  if (chats) {
    return res.status(200).json({ result: chats, _counts: { items: totalCount } });
  }

  throw new NotFoundError("Error in List Groups");
}

const get_chat = async (req: Request, res: Response) => {
  const { id } = req.params;
  const chat_id = Number(id);

  const chat = await getChatById(chat_id);

  if (!chat) throw new NotFoundError("Chat Not Found");

  return res.status(200).json({ result: chat });

}

const search_chats = async (req: Request, res: Response) => {
  const { filter, is_active } = req.query;
  /*
  const searchData: SearchSchema = await searchSchema.validate(req.body, { abortEarly: false });
  const { filter, is_active } = searchData;
  */
  const [organizations, totalCount] = await Promise.all([
    prisma.chat.findMany({
      where: {
        chat_name: {
          contains: String(filter).toUpperCase() ?? ""
        },

        is_active: Boolean(is_active) ?? true
      }
    }),

    prisma.organization.count()
  ]);

  return res.status(200).json({
    result: organizations,
    _count: { itens: totalCount }
  });
}

export { get_all_chats, getChatById, getChatByChatId, search_chats, get_chat };