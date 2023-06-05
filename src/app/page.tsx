'use client'
import Link from 'next/link'
import { useGlobalContext } from '@/app/context/store'
import { useState } from 'react'
import { toast } from 'react-toastify'

export default function Home() {
  const { useremail, userLogin } = useGlobalContext()
  const [cadastrar, setCadastrar] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const abrirModalsig = () => {
    setCadastrar(true)
  }

  const fecharModalsig = () => {
    setCadastrar(false)
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault()

    if (email === '' || password === '' || confirmPassword === '') {
      toast.error('Preencha todos os campos', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    if (password !== confirmPassword) {
      toast.error('As senhas não coincidem', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
      return
    }

    try {
      const response = await fetch('http://localhost:3000/api/newusers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Usar o estado 'email' em vez de 'username'
      })

      if (response.ok) {
        // O usuário foi criado com sucesso
        console.log('Usuário criado com sucesso')
        toast.success('Usuário criado com sucesso', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        })
        setCadastrar(false)
        setEmail('')
        setPassword('')
        setConfirmPassword('')
      } else {
        // Algum erro ocorreu
        const errorData = await response.json()

        if (errorData.error === 'O email já está sendo utilizado') {
          toast.error(errorData.error, {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          })
        }
      }
    } catch (error) {
      console.error('Erro de rede:', error)
    }

    // Limpar campos após a criação do usuário
  }

  return (
    <div className="min-w-screen flex min-h-screen items-center justify-center px-5 py-5">
      {userLogin ? (
        <div className="w-full rounded bg-indigo-600 px-5 py-5 text-white shadow-xl lg:w-10/12 xl:w-3/4">
          <div className="-mx-3 flex flex-wrap items-center">
            <div className="hidden w-full px-3 text-center sm:w-1/4 md:block">
              <div className="p-5 md:py-5 xl:px-8"></div>
            </div>
            <div className="w-full px-3 text-left sm:w-1/2 md:w-2/4">
              <div className="p-5 md:py-5 xl:px-8">
                <h3 className="text-2xl">Bem-vindo, {useremail}!</h3>
                <h5 className="mb-3 text-xl">Impulsione seus conhecimentos</h5>
                <p className="text-sm text-indigo-200">
                  "A única maneira de fazer um ótimo trabalho é amar o que você
                  faz." - Steve Jobs
                </p>
              </div>
            </div>
            <div className="w-full px-3 text-center sm:w-1/2 md:w-1/4">
              <div className="p-5 md:py-5 xl:px-8">
                <Link
                  className="mb-3 block w-full rounded bg-gray-200 px-4 py-2 text-indigo-600 transition duration-150 ease-in-out hover:bg-white hover:text-gray-900 focus:outline-none"
                  href="/aulas"
                >
                  Assistir Aulas!
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="mx-auto my-12 max-w-6xl bg-gray-300 px-8 antialiased">
          <div className="relative block items-center md:flex">
            <div className="z-1 relative w-full overflow-hidden rounded bg-gray-100 shadow-lg md:w-1/2">
              <div className="border-b border-gray-200 p-8 text-center text-lg font-medium uppercase tracking-wide text-green-500">
                Pague conforme você usar
              </div>
              <div className="block items-center justify-center sm:flex md:block lg:flex">
                <div className="mt-8 text-center sm:m-8 md:m-0 md:mt-8 lg:m-8">
                  <div className="inline-flex items-center">
                    <span className="text-3xl font-medium">1.4%</span>
                    <span className="ml-2 text-xl text-gray-600">+</span>
                    <span className="ml-2 text-xl">20p</span>
                  </div>
                  <span className="mt-2 block text-sm text-gray-600">
                    para cartões europeus
                  </span>
                </div>
                <div className="mb-8 mt-4 text-center sm:m-8 md:m-0 md:mb-8 md:mt-4 lg:m-8">
                  <div className="inline-flex items-center">
                    <span className="text-3xl font-medium">2.9%</span>
                    <span className="ml-2 text-xl text-gray-600">+</span>
                    <span className="ml-2 text-xl">20p</span>
                  </div>
                  <span className="mt-2 block text-sm text-gray-600">
                    para cartões não europeus
                  </span>
                </div>
              </div>
              <div className="mt-3 flex justify-center">
                <ul>
                  <li className="flex items-center">
                    <div className="rounded-full bg-green-200 fill-current p-2 text-green-700">
                      <svg
                        className="icon-umbrella h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="primary"
                          d="M11 3.05V2a1 1 0 0 1 2 0v1.05A10 10 0 0 1 22 13c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a2 2 0 1 0-4 0c0 1.33-2 1.33-2 0a10 10 0 0 1 9-9.95z"
                        />
                        <path
                          className="secondary"
                          d="M11 14a1 1 0 0 1 2 0v5a3 3 0 0 1-6 0 1 1 0 0 1 2 0 1 1 0 0 0 2 0v-5z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-lg text-gray-700">
                      Sem taxas de configuração, mensais ou ocultas
                    </span>
                  </li>
                  <li className="mt-3 flex items-center">
                    <div className="rounded-full bg-green-200 fill-current p-2 text-green-700">
                      <svg
                        className="icon-shopping-bag h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="primary"
                          d="M5 8h14a1 1 0 0 1 1 .92l1 12A1 1 0 0 1 20 22H4a1 1 0 0 1-1-1.08l1-12A1 1 0 0 1 5 8z"
                        />
                        <path
                          className="secondary"
                          d="M9 10a1 1 0 0 1-2 0V7a5 5 0 1 1 10 0v3a1 1 0 0 1-2 0V7a3 3 0 0 0-6 0v3z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-lg text-gray-700">
                      Pague apenas pelo que usar
                    </span>
                  </li>
                  <li className="mt-3 flex items-center">
                    <div className="rounded-full bg-green-200 fill-current p-2 text-green-700">
                      <svg
                        className="icon-pie-chart h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                      >
                        <path
                          className="primary"
                          d="M14 13h6.78a1 1 0 0 1 .97 1.22A10 10 0 1 1 9.78 2.25a1 1 0 0 1 1.22.97V10a3 3 0 0 0 3 3z"
                        />
                        <path
                          className="secondary"
                          d="M20.78 11H14a1 1 0 0 1-1-1V3.22a1 1 0 0 1 1.22-.97c3.74.85 6.68 3.79 7.53 7.53a1 1 0 0 1-.97 1.22z"
                        />
                      </svg>
                    </div>
                    <span className="ml-3 text-lg text-gray-700">
                      Relatórios de taxas em tempo real
                    </span>
                  </li>
                </ul>
              </div>
              <button
                className="text-md mt-16 block flex w-full items-center justify-center bg-gray-200 p-8 font-semibold uppercase text-gray-800 hover:bg-gray-300"
                onClick={abrirModalsig}
              >
                <span>Criar uma conta</span>
                <span className="ml-2 font-medium text-gray-700">➔</span>
              </button>
            </div>
            <div className="relative z-0 w-full px-8 md:w-1/2 md:px-0 md:py-16">
              <div className="overflow-hidden rounded-b bg-blue-900 text-white shadow-lg md:rounded-b-none md:rounded-r">
                <div className="border-b border-blue-800 p-8 text-center text-lg font-medium uppercase tracking-wide">
                  Empreendimento
                </div>
                <div className="sm:text-md mx-auto mt-8 max-w-sm px-8 text-center text-sm text-blue-200 lg:px-0">
                  Acredite em si mesmo e invista em seu próprio crescimento
                  profissional! Seja o impulso que impulsiona a sua carreira
                  rumo ao sucesso!
                </div>
                <div className="mx-8 mt-8 flex flex-wrap border border-blue-800 lg:mx-16">
                  <div className="flex w-1/2 items-center justify-center border-b border-r border-blue-800 p-4 text-center">
                    Impulsione sua carreira!
                  </div>
                  <div className="flex w-1/2 items-center justify-center border-b border-blue-800 p-4 text-center">
                    Cursos de qualidade
                  </div>
                  <div className="flex w-1/2 items-center justify-center border-r border-blue-800 p-4 text-center">
                    Profissionais dedicados
                  </div>
                  <div className="flex w-1/2 items-center justify-center p-4 text-center">
                    Suporte em tempo real!
                  </div>
                </div>
                <Link
                  className="text-md mt-8 block flex items-center justify-center bg-blue-800 p-8 font-semibold uppercase text-gray-300 hover:bg-blue-700"
                  href="https://www.linkedin.com/company/seja-impulse/"
                  target="_blank"
                >
                  <span>Contato</span>
                  <span className="ml-2 font-medium text-gray-300">➔</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {cadastrar && (
        <div className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-opacity-50 py-10 backdrop-blur">
          <div className="mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
            <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
              <p className="font-semibold text-gray-800">Faça seu Cadastro</p>
              <svg
                className="h-6 w-6 hover:cursor-pointer hover:text-gray-100"
                onClick={fecharModalsig}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </div>
            <div className="flex flex-col bg-gray-50 px-6 py-5 text-black">
              <form>
                <div className="flex flex-col bg-gray-50 px-6 py-5">
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="password"
                    >
                      Senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Senha"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className="relative mb-3 w-full">
                    <label
                      className="text-blueGray-600 mb-2 block text-xs font-bold uppercase"
                      htmlFor="password"
                    >
                      Confirmar senha
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="placeholder-blueGray-300 text-blueGray-600 w-full rounded border-0 bg-white px-3 py-3 text-sm shadow transition-all duration-150 ease-linear focus:outline-none focus:ring"
                      placeholder="Senha"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                </div>
              </form>
            </div>

            <div className="flex flex-row items-center justify-between rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
              <button
                onClick={fecharModalsig}
                className="rounded bg-red-500 px-4 py-2 font-semibold text-white"
              >
                Cancelar
              </button>
              <button
                onClick={handleSubmit}
                className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
