import { Router } from "express";
import prisma from "../../utils/prismaClient";
import { isEmail, isStrongPassword } from "validator";
import { decryptPw, encryptPw } from "../../utils/pwverify";
import { assignTk } from "../../utils/authtoken";

const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  // body required from client's side
  const {
    userType,
    email,
    password,
    firstname,
    lastname,
    street,
    city,
    province,
    postal,
    lat,
    long,
  } = req.body;

  if (!email || !password)
    return res.json({
      type: "error",
      message: "email & password required.",
    });
  else if (!isEmail(email)) {
    return res.json({
      type: "error",
      message: "Invalid Email Address",
    });
  } else if (
    !isStrongPassword(password, {
      minLength: 8,
      minNumbers: 1,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols: 1,
    })
  ) {
    return res.json({
      type: "error",
      message:
        "Strong password is required. (1 lower, 1 upper, 1 number, 1 symbol, min. 8 length)",
    });
  }

  const checkUser = await prisma.client.findFirst({
    where: { email: email },
  });

  if (!!checkUser)
    return res.json({
      type: "error",
      message: "User with email already exists.",
    });

  await prisma.client
    .create({
      data: {
        email: email,
        password: await encryptPw(password),
        firstname: firstname,
        lastname: lastname,
        address: {
          create: {
            street,
            city,
            province,
            postalCode: postal,
            latitude: lat,
            longitude: long,
          },
        },
        Profile: {
          create: {
            profileType: userType,
          },
        },
      },
    })
    .catch((e) => {
      console.log(e);
      return res.json({
        type: "error",
        message: "Unknown Error: Cannot create a user.",
      });
    });

  return res.json({ type: "success", message: "Successfully created a user." });
});

authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.json({ type: "error", message: "Require email & password." });

  if (!isEmail(email))
    return res.json({ type: "error", message: "Invalid email address." });

  const checkUser = await prisma.client.findFirst({
    where: { email: email },
    select: { Profile: true, email: true, userId: true, password: true },
  });
  if (!checkUser)
    return res.json({
      type: "error",
      message: "Account needs to be registered.",
    });

  if (!(await decryptPw(password, checkUser.password))) {
    return res.json({ type: "error", message: "Invalid password." });
  }

  const tk = assignTk({
    email: checkUser.email,
    userid: checkUser.userId,
    userType: checkUser.Profile?.profileType,
  });

  res.cookie("__petSitTk", tk, {
    httpOnly: true,
    domain: process.env.ENV == "development" ? "localhost" : "",
    sameSite: process.env.ENV == "development" ? "none" : "lax",
  });

  return res.json({ type: "success", message: "Successfully login." });
});

export default authRouter;
