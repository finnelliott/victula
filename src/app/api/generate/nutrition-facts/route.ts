import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export async function POST(request: Request) {
    const { description } = await request.json();

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0,
        messages: [
        {
            role: "system", 
            content: `You are NutritionGPT. The user will provide a description of a meal. Please provide an accurate estimate of the nutritional value as a JSON object with the following types: {
            name: string,
            calories: number (kcal),
            fats: number (g),
            carbohydrates: number (g),
            proteins: number (g),
            notes: string
            }
            Only return the JSON object. Do not provide any explanation or notes. The name should just summarise the described meal in 50 characters or less. If you must include any further information, please place it in the JSON object under the 'notes' value. If you cannot estimate the nutritional content with a moderate level of certainty, return a JSON object { error: true }`
        }, {
            role: "user",
            content: description
        }],
    });
    if (!completion.data.choices[0].message) {
        return new Response('Error generating nutrition facts', {
            status: 500,
        })
    }
    return new Response(JSON.stringify(completion.data.choices[0].message.content))
}  