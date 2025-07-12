import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SafeLearn',
  description: 'Created with Love',
  generator: 'Love.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
