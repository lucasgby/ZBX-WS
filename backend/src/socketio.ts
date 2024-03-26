import { Server } from "socket.io";
import { httpServer } from "./http";

const io = new Server(httpServer);

export { io };