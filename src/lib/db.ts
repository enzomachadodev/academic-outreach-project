import { PrismaClient } from "@prisma/client";

import { env } from "@/config/env";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const prisma = globalForPrisma.prisma || new PrismaClient();

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;

export const db = prisma;
