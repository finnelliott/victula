import prisma from "../../../../prisma/prismadb"
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to create an entry", {
            status: 401,
        })
    }
    try {
        const { carbohydrates, calories, fats, proteins, name, description } = await request.json();
        const entry = await prisma.entry.create({
            data: {
                name,
                description,
                carbohydrates,
                calories,
                fats,
                proteins,
                user: {
                    connect: {
                        clerkId: authenticatedUser.id
                    }
                }
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