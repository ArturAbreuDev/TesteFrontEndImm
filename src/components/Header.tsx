'use client'
import Image from 'next/image'
import logo from '../../public/317695565_607368421347592_5143459480261368409_n.jpg'
import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useGlobalContext } from '@/app/context/store'
import Link from 'next/link'

export default function Header() {
  const {
    setUserId,
    userId,
    login,
    setLogin,
    useremail,
    setUserEmail,
    setUserPassword,
    userpassword,
  } = useGlobalContext()

  const [cadastrar, setCadastrar] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const abrirModal = () => {
    setLogin(true)
  }

  const fecharModal = () => {
    setLogin(false)
  }

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

  const handleSubmitlogin = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        const userData = await response.json()
        setUserId(userData.id)
        setUserEmail(userData.email)
        setUserPassword(userData.password)

        setEmail('')
        setPassword('')
        console.log(userId)
        console.log(useremail)
        console.log(userpassword)

        // Other fields you want to clear
      } else {
        const errorData = await response.json()
      }
    } catch (error) {
      console.error('Erro de rede:', error)
    }
  }

  return (
    <nav className="dark:bg-white-800 w-full  bg-white   px-4 py-2.5 text-white lg:px-6">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between">
        <ToastContainer />
        {/* Renderizar o modal somente se a variável "login" for true */}
        {login && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-50 py-10 backdrop-blur">
            <div className="mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
              <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
                <p className="font-semibold text-gray-800">Faça seu login</p>
                <svg
                  className="h-6 w-6 hover:cursor-pointer hover:text-gray-100"
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
                <form onSubmit={handleSubmit}>
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
                    <div>
                      <label className="inline-flex cursor-pointer items-center">
                        <input
                          id="customCheckLogin"
                          type="checkbox"
                          className="form-checkbox text-blueGray-700 ml-1 h-5 w-5 rounded border-0 transition-all duration-150 ease-linear"
                        />
                        <span className="text-blueGray-600 ml-2 text-sm font-semibold text-black">
                          Lembrar-me
                        </span>
                      </label>
                    </div>
                  </div>
                </form>
              </div>

              <div className="flex flex-row items-center justify-between rounded-bl-lg rounded-br-lg border-t border-gray-200 bg-white p-5">
                <button
                  onClick={fecharModal}
                  className="rounded bg-red-500 px-4 py-2 font-semibold text-white"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmitlogin}
                  className="rounded bg-blue-500 px-4 py-2 font-semibold text-white"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        )}
        {cadastrar && (
          <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center bg-opacity-50 py-10 backdrop-blur">
            <div className="mx-auto flex w-11/12 max-w-2xl flex-col rounded-lg border border-gray-300 shadow-xl sm:w-5/6 lg:w-1/2">
              <div className="flex flex-row justify-between rounded-tl-lg rounded-tr-lg border-b border-gray-200 bg-white p-6">
                <p className="font-semibold text-gray-800">Faça seu Cadastro</p>
                <svg
                  className="h-6 w-6 hover:cursor-pointer hover:text-gray-100"
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
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            className="mr-3 h-10 w-10 rounded-full"
            alt="Logo Grupo Impulse"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold text-black dark:text-white">
            Grupo Impulse
          </span>
        </Link>
        <div className="flex items-center lg:order-2">
          <button
            onClick={abrirModal}
            className="text-white-800 dark:hover:bg-white-700 dark:focus:ring-white-800 mr-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-black text-white hover:bg-gray-400 focus:outline-none focus:ring-4 focus:ring-white dark:text-white lg:px-5 lg:py-2.5"
          >
            Login
          </button>
          <button
            onClick={abrirModalsig}
            className=" dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 mr-2 rounded-lg bg-purple-400 px-4 py-2 text-sm font-medium text-white hover:bg-purple-500 focus:outline-none focus:ring-4 lg:px-5 lg:py-2.5"
          >
            Sign in
          </button>
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="text-white-500 hover:bg-white-100 focus:ring-white-200 dark:text-white-400 dark:hover:bg-white-700 dark:focus:ring-white-600 ml-1 inline-flex items-center rounded-lg p-2 text-sm focus:outline-none focus:ring-2 lg:hidden"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden h-6 w-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        <div
          className="hidden w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
          id="mobile-menu-2"
        >
          <ul className="mt-4 flex flex-col font-medium lg:mt-0 lg:flex-row lg:space-x-8">
            <li>
              <Link
                href="/aula1"
                className="bg-primary-700 lg:text-primary-700 block rounded py-2 pl-3 pr-4 text-black  dark:text-black lg:bg-transparent lg:p-0"
                aria-current="page"
              >
                Aulas
              </Link>
            </li>
            <li>
              <a
                href="#"
                className="lg:hover:text-primary-700 border-white-100 hover:bg-white-50 dark:border-white-700 dark:text-black-400 dark:hover:bg-white-700 block border-b py-2 pl-3 pr-4 text-black dark:hover:text-black lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-black"
              >
                Empresa
              </a>
            </li>
            <li>
              <a
                href="#"
                className="lg:hover:text-primary-700 border-white-100 hover:bg-white-50 dark:border-white-700 dark:text-white-400 dark:hover:bg-white-700 block border-b py-2 pl-3 pr-4 text-black dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                Time
              </a>
            </li>

            <li>
              <a
                href="#"
                className="lg:hover:text-primary-700 border-white-100 dark:border-white-700 dark:text-white-400 dark:hover:bg-white-700 block border-b py-2 pl-3 pr-4 text-black hover:bg-white dark:hover:text-white lg:border-0 lg:p-0 lg:hover:bg-transparent lg:dark:hover:bg-transparent lg:dark:hover:text-white"
              >
                Contato
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}
