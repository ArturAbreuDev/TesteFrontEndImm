import { PrismaClient } from '@prisma/client'
import { NextResponse, NextRequest } from 'next/server'

const prisma = new PrismaClient()

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    // Verifica se o email já existe no banco de dados
    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    // Se o usuário com o email já existe, retorna uma resposta de erro
    if (existingUser) {
      return NextResponse.json(
        { error: 'O email já está sendo utilizado' },
        { status: 400 },
      )
    }

    // Cria o novo usuário
    const novoUsuario = await prisma.user.create({
      data: {
        email,
        password,
      },
    })

    return NextResponse.json({ usuario: novoUsuario })
  } catch (error) {
    console.error('Ocorreu um erro ao adicionar o usuário')
    return NextResponse.json(
      { error: 'Ocorreu um erro ao adicionar o usuário' },
      { status: 500 },
    )
  } finally {
    await prisma.$disconnect()
  }
}
