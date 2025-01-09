"use server";

import { headers } from "next/headers";
import { cache } from "react";

import { auth } from "../lib/auth";

export const getSession = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return session?.session;
});
