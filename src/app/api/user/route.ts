import { currentUser } from "@clerk/nextjs/server";
import prisma from "../../../../prisma/prismadb";
  
export async function PUT(request: Request) {
    try {
        const authenticatedUser = await currentUser();
        const { target_calories, target_carbohydrates, target_fats, target_proteins } = await request.json();
        const user = await prisma.user.update({
            where: {
                clerkId: authenticatedUser?.id
            },
            data: {
                target_calories: target_calories ? parseFloat(target_calories) : null,
                target_carbohydrates: target_carbohydrates ? parseFloat(target_carbohydrates) : null,
                target_fats: target_fats ? parseFloat(target_fats) : null,
                target_proteins: target_proteins ? parseFloat(target_proteins) : null,
            }
        })
        return new Response(JSON.stringify(user));
    } catch (e) {
        console.log(e);
      return new Response("Request cannot be processed!", {
        status: 400,
      });
    }
}