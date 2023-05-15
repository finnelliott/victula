import { currentUser } from "@clerk/nextjs/server";
import { OpenAIStream, OpenAIStreamPayload } from "../../../../utils/OpenAIStream";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing env var from OpenAI");
}

export const runtime = "edge";

export async function POST(request: Request): Promise<Response> {
    const authenticatedUser = await currentUser();
    if (!authenticatedUser) {
        return new Response("Please log in to generate nutrition facts", {
            status: 401,
        })
    }
    const { description } = await request.json();
    
    const payload: OpenAIStreamPayload = {
        model: "gpt-3.5-turbo",
        messages: [
        {
            role: "system", 
            content: `As NutritionGPT, estimate nutritional value of a described meal in a JSON object with:
            - name (≤50 chars)
            - calories (kcal)
            - fats (g)
            - carbohydrates (g)
            - proteins (g)
            - notes (if needed)
            If uncertain, return: { error: true }`
        }, {
            role: "user",
            content: description
        }],
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 1000,
        stream: true,
        n: 1,
    };
    
    const stream = await OpenAIStream(payload);
    return new Response(stream);
}