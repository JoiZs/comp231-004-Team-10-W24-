import { io } from "socket.io-client";

export const skio = io("http://localhost:4000", { withCredentials: true });
