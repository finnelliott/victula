import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../../prisma/prismadb";

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to delete an entry", {
            status: 401,
        })
    }
    try {
        const { id } = params;
        const entryData = await prisma.entry.findUnique({
            where: {
                id
            },
            include: {
                user: true
            }
        })
        if (entryData?.user.clerkId !== authenticatedUser.id) {
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
    } catch (e) {
        console.log(e)
        return new Response("Request cannot be processed.", {
            status: 500,
        })
    }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to create an entry", {
            status: 401,
        })
    }
    try {
        const { id } = params;
        const { carbohydrates, calories, fats, proteins, name, description } = await request.json();
        const entry = await prisma.entry.update({
            where: {
                id
            },
            data: {
                name,
                description,
                carbohydrates,
                calories,
                fats,
                proteins
            },
        })
        return new Response(JSON.stringify(entry))
    } catch (e) {
        console.log(e)
        return new Response("Request cannot be processed.", {
            status: 500,
        })
    }
}