import { Inter, Poppins, Calistoga } from 'next/font/google'
import './globals.css'
import MainLayout from '@/components/layout/MainLayout'
import Providers from '@/components/Providers'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const poppins = Poppins({
  weight: ['500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-poppins',
})

const calistoga = Calistoga({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-calistoga',
})

export const metadata = {
  title: 'Mousa - Music Streaming',
  description: 'A modern music streaming platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} ${calistoga.variable} font-inter`}>
        <Providers>
          <MainLayout>
            {children}
          </MainLayout>
        </Providers>
      </body>
    </html>
  )
}
