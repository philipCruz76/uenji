import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient();
};

declare global {
  // eslint-disable-next-line  no-var, no-unused-vars
  var chachedPrisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.chachedPrisma ?? prismaClientSingleton();

export default db;

if (process.env.NODE_ENV === "development") {
  globalThis.chachedPrisma = db;
}
