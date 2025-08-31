import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Nyxxus Esports - Tournament Registration Platform',
  description: 'Join competitive esports tournaments with Nyxxus Esports. Professional gaming platform with secure registration and admin management.',
  keywords: 'esports, tournament, gaming, registration, Nyxxus, competitive gaming, Valorant, BGMI, CS2',
  authors: [{ name: 'Nyxxus Esports Team' }],
  creator: 'Nyxxus Esports',
  publisher: 'Nyxxus Esports',
  robots: 'index, follow',
  openGraph: {
    title: 'Nyxxus Esports - Tournament Registration',
    description: 'Join competitive esports tournaments with professional gaming platform',
    type: 'website',
    locale: 'en_US',
    siteName: 'Nyxxus Esports',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nyxxus Esports - Tournament Registration',
    description: 'Join competitive esports tournaments with professional gaming platform',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarnings={true}>
        <div id="__next">
          {children}
        </div>
      </body>
    </html>
  )
}