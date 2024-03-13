import { Handler } from "express";
import { verifyTk } from "../utils/authtoken";
import prisma from "../utils/prismaClient";
import "../types/context";

export const checkAuth: Handler = async (req, res, next) => {
  const { __petSitTk } = req.cookies;

  const payload = await verifyTk(__petSitTk);
  if (!payload || typeof payload == "string")
    return res.json({ type: "error", message: "Invalid user. " });

  const findUser = await prisma.client.findFirst({
    where: { userId: payload.payload.userid },
  });

  if (!findUser)
    return res.json({ type: "error", message: "Not authorized user." });
  req.context = { uid: payload.payload.userid };

  return next();
};
