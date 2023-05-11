import Navbar from "@/components/application/navigation/Navbar"

export const metadata = {
  title: 'Victula',
  description: 'A revolutionary way to track nutrition',
}

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-full w-full bg-gray-50">
    <Navbar />
    {children}
    </div>
  )
}
