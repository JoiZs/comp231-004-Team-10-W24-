import argon2 from "argon2";

export const encryptPw = async (pw: string) => {
  return await argon2.hash(pw);
};

export const decryptPw = async (pw: string, longPw: string) => {
  if (!pw || !longPw) return false;
  return await argon2.verify(longPw, pw);
};
