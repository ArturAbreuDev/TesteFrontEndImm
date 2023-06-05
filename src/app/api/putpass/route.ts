import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function PUT(request: NextRequest) {
  try {
    const { email, newPassword } = await request.json()

    // Verifica se o usuário com o email existe no banco de dados
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Se o usuário com o email não existe, retorna uma resposta de erro
    if (!existingUser) {
      return NextResponse.json(
        { error: 'Usuário não encontrado' },
        { status: 404 },
      )
    }

    // Atualiza a senha do usuário
    const updatedUser = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: newPassword,
      },
    })

    return NextResponse.json({ user: updatedUser })
  } catch (error) {
    console.error('Ocorreu um erro ao editar a senha do usuário')
    return NextResponse.json(
      { error: 'Ocorreu um erro ao editar a senha do usuário' },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
