import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
