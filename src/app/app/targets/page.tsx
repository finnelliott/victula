import { currentUser } from "@clerk/nextjs"
import prisma from "../../../../prisma/prismadb"
import TargetChat from "@/components/application/targets/TargetChat.tsx"

export default async function AppTargets() {
    const user = await currentUser()
    const userData = await prisma.user.findUnique({
        where: {
            clerkId: user?.id
        }
    }) 
    return (
        <main className="z-0 relative h-full">
            <div className="mx-auto max-w-3xl px-4 py-8 space-y-8">
                <div className="bg-white rounded-lg border border-gray-300 p-8">
                    <h1 className="text-2xl font-semibold text-gray-900">{userData?.target_calories ? "Targets": "Set targets"}</h1>
                    <div className="mt-2">
                        {userData?.target_calories ? (
                            <>
                            <p className="text-gray-600 text-sm">Your targets are:</p>
                            <ul className="mt-2">
                                <li className="text-gray-600 text-sm">Calories: {userData?.target_calories}</li>
                                <li className="text-gray-600 text-sm">Protein: {userData?.target_proteins}</li>
                                <li className="text-gray-600 text-sm">Carbohydrates: {userData?.target_carbohydrates}</li>
                                <li className="text-gray-600 text-sm">Fat: {userData?.target_fats}</li>
                            </ul>
                            </>
                        ) : (
                            <>
                            <p className="text-gray-600 text-md">You have not set any targets yet. Use the chat below to set some targets which are suitable for your&nbsp;goals.</p>
                            <div className="border border-gray-200 bg-gray-50 shadow-inner rounded-lg mt-8 h-96 overflow-hidden">
                                <TargetChat />
                            </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}