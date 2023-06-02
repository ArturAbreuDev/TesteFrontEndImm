import Header from '@/components/Header'
import './globals.css'
import { Inter } from 'next/font/google'
import { GlobalContextProvider } from './context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  // eslint-disable-next-line no-undef
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalContextProvider>
          <div>
            <Header />
          </div>
          <div>{children}</div>
        </GlobalContextProvider>
      </body>
    </html>
  )
}
