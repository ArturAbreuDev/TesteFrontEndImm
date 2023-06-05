'use client'
import { useState } from 'react'
import aulasData from '../../../public/aulas.json'
import { useGlobalContext } from '@/app/context/store'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  const { useremail, userLogin } = useGlobalContext()
  console.log(useremail)
  const [aulas, setAulas] = useState(aulasData)
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroNivel, setFiltroNivel] = useState('')
  const [filtroFavoritos, setFiltroFavoritos] = useState(false)

  const filtrarAulas = () => {
    let aulasFiltradas = aulasData

    if (filtroCategoria) {
      aulasFiltradas = aulasFiltradas.filter(
        (aula) => aula.categoria === filtroCategoria,
      )
    }

    if (filtroNivel) {
      aulasFiltradas = aulasFiltradas.filter(
        (aula) => aula.nivel === filtroNivel,
      )
    }

    if (filtroFavoritos) {
      aulasFiltradas = aulasFiltradas.filter((aula) => aula.favorito)
    }

    setAulas(aulasFiltradas)
  }

  const limparFiltros = () => {
    setFiltroCategoria('')
    setFiltroNivel('')
    setFiltroFavoritos(false)
    setAulas(aulasData)
  }

  const handleFavoritoClick = (index: any) => {
    const updatedAulas = [...aulas]
    updatedAulas[index].favorito = !updatedAulas[index].favorito
    setAulas(updatedAulas)
  }

  if (!userLogin) {
    return (
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-6xl">Faça o login para assistir as aulas</h1>
      </div>
    )
  }

  return (
    <div className="p-4">
      <h1 className="mb-4 text-2xl font-bold">Lista de Aulas</h1>

      <div className="mb-4 flex space-x-4">
        <div className="flex items-center">
          <label className="mr-2">
            Categoria:
            <select
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="ml-1 rounded border border-gray-300 p-1"
            >
              <option value="">Todas</option>
              <option value="Desenvolvimento de Software">
                Desenvolvimento de Software
              </option>
              <option value="Banco de dados">Banco de Dados</option>
              <option value="Design">Design </option>
              {/* Adicione mais opções de categoria aqui */}
            </select>
          </label>

          <label className="ml-4">
            Nível:
            <select
              value={filtroNivel}
              onChange={(e) => setFiltroNivel(e.target.value)}
              className="ml-1 rounded border border-gray-300 p-1"
            >
              <option value="">Todos</option>
              <option value="Iniciante">Iniciante</option>
              <option value="Intermediário">Intermediário</option>
              <option value="Avançado">Avançado</option>
              {/* Adicione mais opções de nível aqui */}
            </select>
          </label>
        </div>

        <label className="ml-4 flex items-center">
          <input
            type="checkbox"
            checked={filtroFavoritos}
            onChange={(e) => setFiltroFavoritos(e.target.checked)}
            className="mr-1"
          />
          Favoritos
        </label>

        <button
          onClick={filtrarAulas}
          className="rounded bg-purple-400 px-4 py-2 text-white"
        >
          Filtrar
        </button>
        <button
          onClick={limparFiltros}
          className="rounded bg-red-400 px-4 py-2 text-white"
        >
          Limpar Filtros
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {aulas.map((aula, index) => (
          <div key={index} className="relative rounded bg-white p-4">
            <Link href={`/aulas/${aula.id}`}>
              <h2 className="mb-2 text-lg font-bold">{aula.titulo}</h2>
              <Image
                src={aula.imagem}
                alt={aula.titulo}
                width={592}
                height={280}
                className="aspect-video w-full rounded-lg object-cover"
              />
            </Link>
            <p className="mb-2">
              <Link href={`/aulas/${aula.id}`}>{aula.descricao}</Link>
            </p>
            <div
              className="cursor-pointer"
              onClick={() => handleFavoritoClick(index)}
            >
              {aula.favorito ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="yellow"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="absolute right-2 top-2"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="gray"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  className="absolute right-2 top-2"
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                </svg>
              )}
            </div>
            <h1 className="text-md mb-3 mt-4">Categoria: {aula.categoria}</h1>
            <h1 className="text-md mb-3">Nível: {aula.nivel}</h1>
            <div className="flex items-center">
              <Image
                src={aula.icone_professor}
                className="mr-3 h-10 w-10 rounded-full"
                alt="Logo Grupo Impulse"
                width={592}
                height={280}
              />
              <h1 className="mb-1 text-xl">Professor: {aula.professor}</h1>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
