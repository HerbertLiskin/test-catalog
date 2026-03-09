import type { Metadata, Viewport } from 'next'
import { Inter, Cairo, Open_Sans, Roboto_Mono } from 'next/font/google'
import { QueryProvider } from '@/shared/providers/QueryProvider'
import { AuthProvider } from '@/app/providers/AuthProvider'
import { ProgressBar } from '@/shared/ui'
import './globals.css'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin', 'cyrillic'],
})

const cairo = Cairo({
  variable: '--font-cairo',
  subsets: ['latin', 'latin-ext'],
  weight: ['400', '600', '700'],
})

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin', 'cyrillic'],
  weight: ['400', '700'],
})

const robotoMono = Roboto_Mono({
  variable: '--font-roboto-mono',
  subsets: ['latin'],
  weight: ['400'],
})

export const metadata: Metadata = {
  title: 'Aiti Guru — Каталог',
  description: 'Каталог товаров Aiti Guru',
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru">
      <body
        className={`${inter.variable} ${cairo.variable} ${openSans.variable} ${robotoMono.variable} antialiased`}
      >
        <QueryProvider>
          <AuthProvider>
            <ProgressBar />
            {children}
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
