import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    // Verifica se o usuário existe no banco de dados
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Se o usuário não existir, retorna uma resposta de erro
    if (!user) {
      return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Verifica se a senha está correta
    if (user.password !== password) {
      return new Response(JSON.stringify({ error: 'Credenciais inválidas' }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    // Se as credenciais estiverem corretas, retorna os dados do usuário
    return new Response(JSON.stringify(user), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Ocorreu um erro ao fazer login:', error)
    return new Response(
      JSON.stringify({ error: 'Ocorreu um erro ao fazer login' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } },
    )
  }
}
