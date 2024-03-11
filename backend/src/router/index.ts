<<<<<<< HEAD
import Router from "express";

const router = Router();

router.get("/", (_req, res) => {
  res.send("Welcome");
});

export default router;
=======
import authRouter from "./auth";
import reservRouter from "./reservation";
import profileRouter from "./profile";
import chatroomRouter from "./chatroom";

export { authRouter, reservRouter, profileRouter, chatroomRouter };
>>>>>>> bk2
