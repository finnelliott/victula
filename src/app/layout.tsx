import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'

export const metadata = {
  title: 'Victula',
  description: 'A revolutionary way to track nutrition',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
    <html lang="en" className="h-full">
      <body className="h-full">{children}</body>
    </html>
    </ClerkProvider>
  )
}
