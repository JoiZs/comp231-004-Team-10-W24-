import { Router } from "express";

const reservRouter = Router();

reservRouter.get("/reserv", (req, res) => {});
reservRouter.patch("/updatereserv", (req, res) => {});
reservRouter.post("/create", (req, res) => {});
reservRouter.delete("/delete", (req, res) => {});

export default reservRouter;
