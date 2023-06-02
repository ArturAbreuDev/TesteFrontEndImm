import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: Request) {
  // Use o Prisma para obter todos os usuários da tabela "users"
  const users = await prisma.user.findMany()

  // Retorne os usuários como uma resposta JSON
  return new Response(JSON.stringify(users), {
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
