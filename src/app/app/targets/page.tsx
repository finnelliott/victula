import { currentUser } from "@clerk/nextjs"
import prisma from "../../../../prisma/prismadb"
import InputTargetContext from "../../../components/application/generate/InputTargetContext"
import EditTargets from "../../../components/application/targets/EditTargets"

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
                            <EditTargets user={userData} />
                        ) : (
                            <>
                            <p className="text-gray-600 text-md">You have not set any targets yet. Please provide as much information as possible in order to set appropriate goals.</p>
                            <InputTargetContext />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}