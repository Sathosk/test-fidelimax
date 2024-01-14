import './globals.css'

import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'

import Header from '@/components/Header'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Title goes here',
  description: 'Description goes here',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.className} text-gray-700`}>
        <Header />
        {children}
      </body>
    </html>
  )
}
