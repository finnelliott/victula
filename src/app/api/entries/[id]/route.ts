import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../../prisma/prismadb";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const user = await currentUser();
    if (user) {
        const { id } = params;
        const entryData = await prisma.entry.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        if (entryData?.user.clerkId !== user.id) {
            return new Response("You do not have permission to delete this entry", {
                status: 401,
            })
        }
        const entry = await prisma.entry.delete({
            where: {
                id
            }
        })
        return new Response(JSON.stringify(entry))
    } else {
        return new Response("Please log in to delete an entry", {
            status: 401,
        })
    }
}