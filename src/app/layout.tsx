import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Header from '@/components/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={poppins.className}>
        <Header />
        {children}
      </body>
    </html>
  )
}
