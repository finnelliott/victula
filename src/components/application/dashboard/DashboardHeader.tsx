import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

export default function DashboardHeader({
    currentDate,
    selectedDate,
    previousDate,
    nextDate
}: {
    currentDate: string,
    selectedDate: string,
    previousDate: string,
    nextDate: string
}) {
    return (
        <div className="w-full flex justify-between items-center p-8">
                <h1 className="text-2xl font-semibold text-gray-900">{currentDate == selectedDate ? "Today" : new Date(selectedDate).toDateString()}</h1>
                <div className="flex items-center space-x-2">
                    {(currentDate !== new Date(selectedDate).toISOString().split("T")[0]) && <Link href="/app" className="inline-flex items-center rounded-full bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <CalendarDaysIcon className="w-5 h-5 text-gray-700" />
                    </Link>}
                    <Link href={`/app?date=${previousDate}`} className="inline-flex items-center rounded-full bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                    </Link>
                    <Link href={`/app?date=${nextDate}`} className="inline-flex items-center rounded-full bg-white p-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                        <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                    </Link>
                </div>
        </div>
    )
}