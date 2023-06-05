'use client'
import Image from 'next/image'
import aulasData from '../../../../public/aulas.json'
import SemAcesso from '@/components/SemAcesso'
import { useGlobalContext } from '@/app/context/store'

export default function Memory({ params }: any) {
  const { userLogin } = useGlobalContext()

  const aula = aulasData.find((aula: any) => aula.id === parseInt(params.id))

  if (!userLogin) {
    return <SemAcesso />
  }

  if (!aula) {
    console.log(params)
    return <div>Aula não encontrada.</div>
  }

  // Gerar um tempo aleatório para simular a duração do vídeo entre 1h e 2h
  const duracaoVideo = Math.floor(Math.random() * 3600) + 3600 // Entre 1h (3600s) e 2h (7200s)

  return (
    <div className="flex flex-1 flex-col gap-4 p-16">
      <article className="rounded-lg bg-white shadow-lg">
        <div className="aspect-w-16 aspect-h-9 relative">
          <Image
            src={aula.imagem}
            alt={aula.titulo}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
        <div className="p-6">
          <h2 className="mb-2 text-lg font-bold">{aula.titulo}</h2>
          <p className="mb-2">{aula.descricao}</p>
          <div className="relative h-96 w-full bg-black">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-20 w-20 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <polygon points="10 8 16 12 10 16 10 8" />
              </svg>
            </div>
          </div>
          <div className="mb-4 mt-4 flex items-center">
            <Image
              src={aula.icone_professor}
              className="mr-3 h-10 w-10 rounded-full"
              alt="Logo Grupo Impulse"
              width={280}
              height={210}
            />
            <h1 className="text-md font-bold">Professor: {aula.professor}</h1>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 0C4.478 0 0 4.478 0 10s4.478 10 10 10 10-4.478 10-10S15.522 0 10 0zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm1-10a1 1 0 0 0-2 0v3.586l-1.293-1.293a1 1 0 0 0-1.414 1.414l3 3a1 1 0 0 0 1.414 0l3-3a1 1 0 1 0-1.414-1.414L11 11.586V8z"
              />
            </svg>
            <h1 className="text-md mr-4 text-gray-500">
              Categoria: {aula.categoria}
            </h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-1 h-5 w-5 text-gray-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 0h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H5a5 5 0 0 1-5-5V5a5 5 0 0 1 5-5zm10 1H5a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h10a4 4 0 0 0 4-4V5a4 4 0 0 0-4-4z"
              />
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"
              />
            </svg>
            <div className="flex items-center">
              <h1 className="text-md text-gray-500">Nível: {aula.nivel}</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-2 h-5 w-5 text-gray-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              ></svg>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="ml-1 h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <h1 className="text-md mr-4 text-gray-500">
                Duração: {Math.floor(duracaoVideo / 3600)}h
              </h1>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
