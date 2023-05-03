import './globals.css'
import { Nunito } from 'next/font/google'

import Navbar from './components/navbar/Navbar'

// Modals
import RegisterModal from './components/modals/RegisterModal'
import HostModal from './components/modals/HostModal'
import LoginModal from './components/modals/LoginModal'

import ToasterProvider from './providers/ToasterProvider'
import getCurrentUser from './actions/getCurrentUser'


const nunito = Nunito({ subsets: ['latin'] })

export const metadata = {
  title: 'Airbnb',
  description: 'clone airbnb',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const currentUser = await getCurrentUser();

  return (
    <html lang="en">
      <body className={nunito.className}>
      <ToasterProvider />
          <RegisterModal />
          <LoginModal />
          <HostModal />
        <Navbar currentUser = {currentUser}/>
        {children}
      </body>
    </html>
  )
}
