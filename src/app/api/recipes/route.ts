import prisma from "../../../../prisma/prismadb"
import { currentUser } from "@clerk/nextjs/server";

export async function GET(request: Request) {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to create an entry", {
            status: 401,
        })
    }
    try {
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');
        if (!query) {
            const recipes = await prisma.recipe.findMany({
                where: {
                    user: {
                        clerkId: authenticatedUser.id
                    }
                },
                take: 10,
                orderBy: {
                    entries: {
                        _count: 'desc'
                    }
                }
            })
            return new Response(JSON.stringify(recipes))
        } else {
            const recipes = await prisma.recipe.findMany({
                where: {
                    user: {
                        clerkId: authenticatedUser.id
                    },
                    OR: [
                        {
                            name: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        },
                        {
                            description: {
                                contains: query,
                                mode: 'insensitive'
                            }
                        }
                    ]
                },
                take: 10,
                orderBy: {
                    entries: {
                        _count: 'desc'
                    }
                }
            })
            return new Response(JSON.stringify(recipes))
        }
    } catch (e) {
        console.log(e)
        return new Response("Request cannot be processed.", {
            status: 500,
        })
    }
}