// import { PrismaClient } from "@prisma/client"

// declare global {
//   var prisma: PrismaClient | undefined
// }


// export const prisma = globalThis.prisma || new PrismaClient()

// if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma

import { PrismaClient } from '@prisma/client'

const prismaClientSingleton = () => {
  return new PrismaClient()
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()


if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma