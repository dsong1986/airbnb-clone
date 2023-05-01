import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modals/RegisterModal'
import ToasterProvider
 from './providers/ToasterProvider'
import LoginModal from './components/modals/LoginModal'
const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'clone airbnb',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={nunito.className}>
      <ToasterProvider />
          <RegisterModal />
          <LoginModal />
        <Navbar />
        {children}
      </body>
    </html>
  )
}
