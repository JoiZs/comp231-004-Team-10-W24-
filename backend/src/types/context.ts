import { Request } from "express";

declare module "express-serve-static-core" {
  interface Request {
    user: {
      userid: string;
      userType: string;
      email: string;
    };
  }
}

declare module "node:http" {
  interface IncomingMessage {
    session: any;
    user: { userid: string; userType: string; email: string };
  }
}
