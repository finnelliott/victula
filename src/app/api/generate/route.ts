import { currentUser } from "@clerk/nextjs/server";
import generateNutritionFacts from "@/utils/GenerateNutritionFacts";
import { generateNutritionTargets } from "@/utils/GenerateNutritionTargets";

export const runtime = "edge";

export async function POST(request: Request): Promise<Response> {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to generate nutrition facts", {
            status: 401,
        })
    }
    const { type } = await request.json();
    switch (type) {
        case "nutrition-facts":
            return await generateNutritionFacts(request);
        case "nutrition-targets":
            return await generateNutritionTargets(request);
        default:
            return new Response("Invalid type", {
                status: 400,
            })
    }
}