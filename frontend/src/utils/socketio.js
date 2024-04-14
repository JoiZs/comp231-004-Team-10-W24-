import { io } from "socket.io-client";

export const skio = io(import.meta.env.VITE_SERV_URL, {
  withCredentials: true,
});
