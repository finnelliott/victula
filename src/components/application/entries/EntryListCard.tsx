import { currentUser } from '@clerk/nextjs'
import { ChevronRightIcon } from '@heroicons/react/20/solid'
import Link from 'next/link'
import prisma from "../../../../prisma/prismadb"

export default async function EntryListCard() {
  const user = await currentUser()
  const entries = await prisma.entry.findMany({
    where: {
      user: {
        clerkId: user?.id
      }
    }
  })
  return (
    <div className="overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
      <div className="border-b border-gray-200 bg-white px-4 py-5 sm:px-6">
        <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
          <div className="ml-4 mt-2">
            <h3 className="text-base font-semibold leading-6 text-gray-900">Food diary</h3>
          </div>
          <div className="ml-4 mt-2 flex-shrink-0">
            <Link
              href="/app/entries/new"
              className="relative inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Create new entry
            </Link>
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-100"
      >
        {entries.map((entry) => (
          <li key={entry.id} className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6">
            <div className="flex gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={`/app/entries/${entry.id}`}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {entry.name}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  {entry.calories}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <p className="text-sm leading-6 text-gray-900">{entry.proteins}</p>
              </div>
              <ChevronRightIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
