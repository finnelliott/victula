import ProgressChart from "@/components/application/data/ProgressChart";
import EntryListCard from "@/components/application/entries/EntryListCard";
import PageWrapper from "@/components/application/layout/PageWrapper";
import prisma from "../../../prisma/prismadb";
import { currentUser } from "@clerk/nextjs";
import { redirect } from 'next/navigation';
import InputDescription from "@/components/application/generate/InputDescription";
import DailySummary from "@/components/application/data/DailySummary";

export default async function AppHome() {
    const user = await currentUser()
    // if (!user?.id) return (
    //     redirect('/app/sign-in')
    // )
    const entries = await prisma.entry.findMany({
        where: {
            user: {
                clerkId: user?.id
            },
            consumed_at: {
                gte: new Date(new Date().setHours(0, 0, 0, 0)),
                lte: new Date(new Date().setHours(23, 59, 59, 999))
            }
        }
    })
    return (
        <main className="z-0 relative h-full">
            <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
                <InputDescription />
                <DailySummary />
                {JSON.stringify(entries)}
                
            </div>
        </main>
    )
}