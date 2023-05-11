import prisma from "../../../../prisma/prismadb"
import { currentUser } from "@clerk/nextjs/server";

export async function POST(request: Request) {
    const user = await currentUser();
    if (user) {
        console.log(user.id)
        const { carbohydrates, calories, fats, proteins, name } = await request.json();
        const entry = await prisma.entry.create({
            data: {
                name,
                carbohydrates,
                calories,
                fats,
                proteins,
                user: {
                    connect: {
                        clerkId: user?.id
                    }
                }
            },
        })
        return new Response(JSON.stringify(entry))
    } else {
        return new Response("Please log in to create an entry", {
            status: 401,
        })
    }
}