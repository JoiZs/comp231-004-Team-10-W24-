import passport from "passport";
import { Strategy } from "passport-local";
import isEmail from "validator/lib/isEmail";
import prisma from "./prismaClient";
import { decryptPw } from "./pwverify";
import { Express, NextFunction, Response, Request, Handler } from "express";

export const passportInit = (app: Express) => {
  passport.use(
    new Strategy({ usernameField: "email" }, async (email, password, cb) => {
      if (!email || !password)
        return cb(null, false, {
          message: "Require email & password.",
        });

      if (!isEmail(email)) {
        return cb(null, false, {
          message: "Invalid email address.",
        });
      }
      const checkUser = await prisma.client.findFirst({
        where: { email: email },
        select: { Profile: true, email: true, userId: true, password: true },
      });

      if (!checkUser)
        return cb(null, false, {
          message: "Account needs to be registered.",
        });

      if (!(await decryptPw(password, checkUser.password))) {
        return cb(null, false, { message: "Incorrect password." });
      }

      return cb(null, {
        email: checkUser.email,
        userid: checkUser.userId,
        userType: checkUser.Profile?.profileType,
      });
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user);
  });

  passport.deserializeUser((user: Express.User, cb) => {
    cb(null, user);
  });
};

export function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
): Response | void {
  if (req.user) return next();
  else return res.json({ type: "error", message: "You need to login first." });
}

export function onlyForHandshake(middleware: Handler) {
  return (req: any, res: Response, next: NextFunction) => {
    const isHandshake = req._query.sid === undefined;
    if (isHandshake) {
      middleware(req, res, next);
    } else {
      next();
    }
  };
}
