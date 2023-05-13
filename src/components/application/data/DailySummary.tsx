"use client";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useSearchParams } from 'next/navigation';

export default function DailySummary() {
    const searchParams = useSearchParams();
    const searchDate = searchParams?.get('date');
    const date = searchDate ? new Date(searchDate) : new Date();
    const currentDate = new Date().toISOString().split('T')[0];
    const selectedDate = new Date(date).toISOString().split('T')[0];
    const previousDate = new Date(date.setDate(date.getDate() - 1)).toISOString().split('T')[0];
    const nextDate = new Date(date.setDate(date.getDate() + 2)).toISOString().split('T')[0];
    return (
        <div className="max-w-3xl mx-auto border-gray-300 bg-white border rounded-lg p-8 overflow-hidden">
            <div className="w-full flex justify-between items-center">
                <h2 className="text-2xl font-semibold text-gray-900">{currentDate == selectedDate ? "Today" : new Date(selectedDate).toDateString()}</h2>
                <div className="flex items-center space-x-2">
                    <Link href={`/app?date=${previousDate}`} className="bg-gray-100 hover:bg-gray-200 rounded-full p-2">
                        <ChevronLeftIcon className="h-5 w-5 text-gray-700" />
                    </Link>
                    <Link href={`/app?date=${nextDate}`} className="bg-gray-100 hover:bg-gray-200 rounded-full p-2">
                        <ChevronRightIcon className="h-5 w-5 text-gray-700" />
                    </Link>
                </div>
            </div>
        </div>
    )
}