import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: undefined | PrismaClient
}

const db = globalThis.prisma ?? new PrismaClient()

export default db

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db
