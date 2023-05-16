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
        const { carbohydrates, calories, fats, proteins, name, description, recipe_id, consumed_at } = await request.json();
        if (recipe_id) {
            const entry = await prisma.entry.create({
                data: {
                    name,
                    description,
                    consumed_at: new Date(consumed_at),
                    carbohydrates,
                    calories,
                    fats,
                    proteins,
                    user: {
                        connect: {
                            clerkId: authenticatedUser.id
                        }
                    },
                    recipe: {
                        connect: {
                            id: recipe_id
                        },
                    }
                },
            })
            return new Response(JSON.stringify(entry))
        } else {
            const entry = await prisma.entry.create({
                data: {
                    name,
                    description,
                    consumed_at: new Date(consumed_at),
                    carbohydrates,
                    calories,
                    fats,
                    proteins,
                    user: {
                        connect: {
                            clerkId: authenticatedUser.id
                        }
                    },
                    recipe: {
                        create: {
                            name,
                            description,
                            user: {
                                connect: {
                                    clerkId: authenticatedUser.id
                                }
                            },
                            calories,
                            carbohydrates,
                            fats,
                            proteins,
                        },
                    }
                },
            })
            return new Response(JSON.stringify(entry))
        }
    } catch (e) {
        console.log(e)
        return new Response("Request cannot be processed.", {
            status: 500,
        })
    }
}