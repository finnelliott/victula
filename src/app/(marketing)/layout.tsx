import Header from "@/components/marketing/navigation/Header"

export const metadata = {
  title: 'Victula',
  description: 'A revolutionary way to track nutrition',
}

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Header />
    {children}
    </>
  )
}
