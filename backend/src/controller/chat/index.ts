import { create_chat } from "./CREATE";
import { get_all_chats, search_chats, get_chat } from "./GET";
import { delete_chat } from "./DELETE";
import { update_chat } from "./UPDATE";

export const chatController = {
  GET: { get_all_chats, search_chats, get_chat },
  CREATE: { create_chat },
  UPDATE: { update_chat },
  DELETE: { delete_chat }
}