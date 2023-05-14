import { CalendarDaysIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import EntryList from "../entries/EntryList";
import { Entry, User } from "@prisma/client";
import ProgressChart from "./ProgressChart";
import DashboardEntryListHeading from "../entries/DashboardEntryListHeading";

export default function DailySummary({ entries, selectedDate, user }: { entries: Entry[], selectedDate: string, user: User }) {
    const date = new Date(selectedDate);
    const currentDate = new Date().toISOString().split('T')[0];
    const previousDate = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0];
    const nextDate = new Date(date.setDate(date.getDate() + 2)).toISOString().split('T')[0];
    return (
        <>
        <div className="max-w-3xl mx-auto border-gray-300 bg-white border rounded-lg">
            <div className="w-full flex justify-between items-center border-b border-gray-300 p-8">
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
            <div className="w-full flex justify-between items-center">
                {
                    (user.target_calories && user.target_carbohydrates && user.target_fats && user.target_proteins) ?
                    <ProgressChart entries={entries} targets={{ calories: user.target_calories, fats: user.target_fats, carbohydrates: user.target_carbohydrates, proteins: user.target_proteins  }} /> :
                    <div className="text-gray-500 w-full flex justify-between items-center space-x-4 bg-gray-50 p-8">
                        <div>Set daily targets to see your progress.</div>
                        <Link href="/app/targets">
                        <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Set targets
                        </button>
                        </Link>
                    </div>
                }
            </div>
        </div>
        <div className="mt-8 max-w-3xl mx-auto border-gray-300 bg-white border rounded-lg">
            <DashboardEntryListHeading entries={entries} />
            <div className="w-full flex">
                {/* @ts-ignore */}
                <EntryList entries={entries} date={new Date(selectedDate)} />
            </div>
        </div>
        </>
    )
}