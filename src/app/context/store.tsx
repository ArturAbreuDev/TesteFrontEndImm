'use client'
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
} from 'react'

type DataType = {
  firstName: string
}

interface ContextProps {
  userId: string
  setUserId: Dispatch<SetStateAction<string>>
  useremail: string
  setUserEmail: Dispatch<SetStateAction<string>>
  email: string
  setEmail: Dispatch<SetStateAction<string>>
  userpassword: string
  setUserPassword: Dispatch<SetStateAction<string>>
  password: string
  setPassword: Dispatch<SetStateAction<string>>
  id: string
  setId: Dispatch<SetStateAction<string>>
  data: DataType[]
  setData: Dispatch<SetStateAction<DataType[]>>
  login: string
  setLogin: Dispatch<SetStateAction<string>>
}

const GlobalContext = createContext<ContextProps>({
  userId: '',
  setUserId: (): string => '',
  useremail: '',
  setUserEmail: (): string => '',
  userpassword: '',
  setUserPassword: (): string => '',
  email: '',
  setEmail: (): string => '',
  password: '',
  setPassword: (): string => '',
  id: '',
  setId: (): string => '',
  data: [],
  setData: (): DataType[] => [],
  login: '',
  setLogin: (): string => '',
})

export const GlobalContextProvider = ({ children }: any) => {
  const [userId, setUserId] = useState('')
  const [email, setEmail] = useState('')
  const [useremail, setUserEmail] = useState('')
  const [password, setPassword] = useState('')
  const [userpassword, setUserPassword] = useState('')
  const [id, setId] = useState('')
  const [login, setLogin] = useState('')
  const [data, setData] = useState<[] | DataType[]>([])

  return (
    <GlobalContext.Provider
      value={{
        userId,
        setUserId,
        email,
        setEmail,
        password,
        setPassword,
        id,
        setId,
        data,
        setData,
        login,
        setLogin,
        useremail,
        setUserEmail,
        userpassword,
        setUserPassword,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
