import { Router } from "express";

const reviewRouter = Router();

reviewRouter.post("/allreviews", (req, res) => {});
reviewRouter.patch("/updatereview", (req, res) => {});
reviewRouter.post("/postreview", (req, res) => {});

export default reviewRouter;
