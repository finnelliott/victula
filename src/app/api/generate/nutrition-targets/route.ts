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
    const { gender, age, height, weight, activityLevel, weightGoals } = await request.json();
    
    const payload: OpenAIStreamPayload = {
        model: "gpt-4",
        messages: [
            { role: "user", content: `Provide daily nutrition targets as a JSON object based on the given information about me:
            - Height: ${height}
            - Weight: ${weight}
            - Age: ${age}
            - Gender: ${gender}
            - Activity Level: ${activityLevel}
            - Goal: ${weightGoals}
            The JSON object should include:
            - target_calories
            - target_fats
            - target_carbohydrates
            - target_proteins
            - assumptions (use this if the user's input was inspecific)
            If uncertain, return a JSON object with:
            - error (explanation of why it was not possible to estimate the nutritional value
            Only return the JSON object. Don't provide any notes or explanation.
            ` }
        ],
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