export default function PageWrapper({ heading, children }: { heading: string, children: React.ReactNode }) {
    return (
        <div className="py-10 bg-gray-50 h-full">
          <header>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <h1 className="text-3xl font-medium leading-tight tracking-tight text-gray-900">{heading}</h1>
            </div>
          </header>
          <main>
            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">{children}</div>
          </main>
        </div>
    )
}