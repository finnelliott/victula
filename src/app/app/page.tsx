import prisma from "../../../prisma/prismadb";
import { currentUser } from "@clerk/nextjs";
import { User } from "@prisma/client";
import { redirect } from "next/navigation";
import DashboardHeader from "@/components/application/dashboard/DashboardHeader";
import DashboardAnalytics from "@/components/application/dashboard/DashboardAnalytics";
import DashboardDiaryHeader from "@/components/application/dashboard/DashboardDiaryHeader";
import DashboardDiary from "@/components/application/dashboard/DashboardDiary";

async function getEntries(user: User, selectedDateString: string) {
    const entries = await prisma.entry.findMany({
        where: {
            user: {
                id: user.id
            },
            consumed_at: {
                // Between 00:00:00 and 23:59:59 on the selected date
                gte: new Date(new Date(selectedDateString).setHours(0, 0, 0, 0)),
                lte: new Date(new Date(selectedDateString).setHours(23, 59, 59, 999))
            }
        }
    })
    return entries
}

export default async function AppDashboard({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    // Get the current user and their data
    const user = await prisma.user.findUnique({ where: { clerkId: (await currentUser())?.id } }); 
    if (!user) redirect('/');

    // Check the search params for a date, check it is a string, not an array and ensure it is valid
    if (searchParams.date && typeof searchParams.date !== 'string') redirect('/app');

    // Get the date from the search params or default to today
    const selectedDate = searchParams.date ? new Date(searchParams.date) : new Date()
    const selectedDateString = selectedDate.toISOString().split('T')[0];

    // Get the current, previous, and next dates
    const currentDate = new Date()
    const currentDateString = currentDate.toISOString().split('T')[0];
    const previousDate = new Date(selectedDate.setDate(selectedDate.getDate() - 1));
    const previousDateString = previousDate.toISOString().split('T')[0];
    const nextDate = new Date(selectedDate.setDate(selectedDate.getDate() + 2));
    const nextDateString = nextDate.toISOString().split('T')[0];

    // Get the entries for the selected date
    const entries = await getEntries(user, selectedDateString)

    return (
        <main className="z-0 relative h-full">
            <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
                {/* Header & analytics card */}
                <div className="border-gray-300 bg-white border rounded-lg divide-y divide-gray-300">
                    <DashboardHeader 
                        selectedDate={selectedDateString}
                        currentDate={currentDateString}
                        previousDate={previousDateString}
                        nextDate={nextDateString}
                    />
                    <DashboardAnalytics
                        entries={entries}
                        user={user}
                    />
                </div>
                {/* Diary card */}
                <div className="border-gray-300 bg-white border rounded-lg divide-y divide-gray-300">
                    <DashboardDiaryHeader 
                        entries={entries}
                    />
                    <DashboardDiary
                        entries={entries}
                        date={selectedDate}
                    />
                </div>
            </div>
        </main>
    )
}