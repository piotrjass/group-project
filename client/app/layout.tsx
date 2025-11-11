import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Flashcards - Learn Full Stack',
  description: 'Master full-stack technologies with interactive flashcards and tests',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
