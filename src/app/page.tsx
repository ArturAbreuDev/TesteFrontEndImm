'use client'
import { useState } from 'react'
import aulasData from '../../public/aulas.json'
import { useGlobalContext } from '@/app/context/store'
import Image from 'next/image'

export default function Home() {
  const { useremail } = useGlobalContext()
  console.log(useremail)
  const [aulas, setAulas] = useState(aulasData)
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroNivel, setFiltroNivel] = useState('')

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

    setAulas(aulasFiltradas)
  }

  const limparFiltros = () => {
    setFiltroCategoria('')
    setFiltroNivel('')
    setAulas(aulasData)
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
          <div key={index} className="rounded bg-white p-4">
            <h2 className="mb-2 text-lg font-bold">{aula.titulo}</h2>
            <p className="mb-2">{aula.descricao}</p>
            <Image
              src={aula.imagem}
              alt={aula.titulo}
              width={592}
              height={280}
              className="aspect-video w-full rounded-lg object-cover"
            />
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
