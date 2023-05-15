import { currentUser } from "@clerk/nextjs"
import prisma from "../../../../prisma/prismadb"
import { redirect } from "next/navigation";
import TargetsHeader from "@/components/application/targets/TargetsHeader";
import TargetsDisplay from "@/components/application/targets/TargetsDisplay";

export default async function AppTargets() {
    // Get the current user and their data
    const user = await prisma.user.findUnique({ where: { clerkId: (await currentUser())?.id } }); 
    if (!user) redirect('/');

    return (
        <main className="z-0 relative h-full">
            <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
                {/* Header & existing targets card */}
                <div className="border-gray-300 bg-white border rounded-lg divide-y divide-gray-300">
                    <TargetsHeader user={user} />
                    <TargetsDisplay user={user} />
                </div>
            </div>
        </main>
    )
}