import { Request, Response } from "express";

import { client } from "../mainController";
import { NotFoundError } from "../../model/api-errors";

const get_chats_ws = async (req: Request, res: Response) => {
  const { skip } = req.body;

  const data = await client.getChats();

  if (data) {
    const groups = data.slice(0, Number(skip));

    return res.status(200).json({ result: groups });
  }

  throw new NotFoundError("Groups Not Found")
}

export {
  get_chats_ws,
}