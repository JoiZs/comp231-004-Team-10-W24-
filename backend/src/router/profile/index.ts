import { Router } from "express";

const profileRouter = Router();

profileRouter.get("/me", (req, res) => {});
profileRouter.post("/sitters", (req, res) => {});
profileRouter.post("/single_sitter", (req, res) => {});
profileRouter.patch("/update", (req, res) => {});
profileRouter.patch("/changepic", (req, res) => {});
profileRouter.patch("/changeava", (req, res) => {});

export default profileRouter;
