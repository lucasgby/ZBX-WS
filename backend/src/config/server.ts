import dotenv from "dotenv";

dotenv.config();

const CONSTANTS = {
  PORT: process.env.PORT_SERVER,
  SERVER: process.env.API_SERVER,
  API_ZBX: process.env.API_ZBX,
  ID_WS_GROUP: process.env.GROUP_LOG_MESSAGES,
  TOKEN: process.env.TOKEN_AUTH,
  ZBX_SESSION: process.env.SESSION,
  PWT_PASS: process.env.PWT_PASS
}

export { CONSTANTS };