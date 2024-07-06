"use server";

import { cookies } from "next/headers";

export async function setSessionToken(token: string) {
  const oldSession = cookies().has("session")
    ? cookies().get("session")?.value
    : {};

  const newSession = {
    ...oldSession,
    token,
  };

  cookies().set("session", JSON.stringify(newSession), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 30, // 30 minutes
    path: "/",
  });

  return {
    status: "success",
    message: "token set for 30 minutes",
  };
}

export async function getSessionToken() {
  const session = cookies().get("session");
  if (!session) return null;
  return JSON.parse(session.value)?.token || null;
}
