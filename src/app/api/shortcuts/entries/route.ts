import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

function formatResponse(text: string) {
    const { name, calories, fats, carbohydrates, proteins, assumptions, error } = JSON.parse(text);
    if (error) {
        return `Error: ${error}`;
    }
    return `${name}
${calories} kcal | ${fats} g Fat | ${carbohydrates} g Carbs | ${proteins} g Protein

Assumptions: ${assumptions}`;
}

export async function POST(request: Request) {
    const { description } = await request.json();
    const completion = await openai.createChatCompletion({
        model: "gpt-4",
        messages: [
        {
            role: "system", content: `As NutritionGPT, estimate nutritional value of a described meal in a JSON object with:
            - name (≤50 chars)
            - calories (kcal)
            - fats (g)
            - carbohydrates (g)
            - proteins (g)
            - assumptions (use this if the user's input was inspecific)
            If uncertain, return a JSON object with:
            - error (explanation of why it was not possible to estimate the nutritional value
            Only return the JSON object. Don't provide any notes or explanation.`
        }, {
            role: "user", content: description
        }
    ],
    });
    const response = completion.data.choices[0].message ? formatResponse(completion.data.choices[0].message.content) : "Sorry we were unable to generate nutrition facts for this meal."
    return new Response(JSON.stringify({
        response
    }));
}