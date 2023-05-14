import prisma from "../../../prisma/prismadb";
import { currentUser } from "@clerk/nextjs";
import InputDescription from "@/components/application/generate/InputDescription";
import DailySummary from "@/components/application/data/DailySummary";
import { User } from "@prisma/client";

export default async function AppHome({
    searchParams,
  }: {
    searchParams: { [key: string]: string | string[] | undefined };
  }) {
    const user = await currentUser()
    const userData = await prisma.user.findUnique({
        where: {
            clerkId: user?.id
        }
    })
    const selectedDate = searchParams.date ? new Date(searchParams.date as string).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
    const entries = await prisma.entry.findMany({
        where: {
            user: {
                clerkId: user?.id
            },
            consumed_at: {
                gte: new Date(new Date(selectedDate).setHours(0, 0, 0, 0)),
                lte: new Date(new Date(selectedDate).setHours(23, 59, 59, 999))
            }
        }
    })
    return (
        <main className="z-0 relative h-full">
            <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
                <InputDescription />
                <DailySummary entries={entries} selectedDate={selectedDate} user={userData as User} />
            </div>
        </main>
    )
}