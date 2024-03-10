import jwt from "jsonwebtoken";
import { isJWT } from "validator";

export const assignTk = (pl: any) => {
  return jwt.sign({ payload: pl }, process.env.JWT_SECT!, { expiresIn: "3h" });
};

export const verifyTk = (tk: any) => {
  if (!isJWT(tk)) return false;
  return jwt.verify(tk, process.env.JWT_SECT!);
};
