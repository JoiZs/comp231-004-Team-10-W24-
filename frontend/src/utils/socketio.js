import { io } from "socket.io-client";

<<<<<<< HEAD
export const skio = io("http://localhost:4000", { withCredentials: true });
=======
export const skio = io(import.meta.env.VITE_SERV_URL, {
  withCredentials: true,
});
>>>>>>> b2d7069 (build(docker): dockerize the app)
