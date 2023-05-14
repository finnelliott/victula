if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

export async function POST(request: Request) {
  try {
    const { gender, age, height, weight, activityLevel, goal } = await request.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
            { role: "user", content: `Here is some information about me.
            Height: ${height}
            Weight: ${weight}
            Age: ${age}
            Gender: ${gender}
            Activity Level: ${activityLevel}
            Goal: ${goal}
            Based on this information, please provide daily nutrition targets as a JSON object with the following types: {
                target_calories: number (kcal),
                target_fats: number (g),
                target_carbohydrates: number (g),
                target_proteins: number (g),
                explanation: string,
                notes: string
            }
            Only return the JSON object. Please provide an explanation for the targets under the 'explanation' key in the JSON object. If you must include any further information, please place it in the JSON object under the 'notes' key. If you cannot estimate the appropriate targets with a moderate level of certainty, return a JSON object { error: true }
            ` }
        ],
        temperature: 0,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        max_tokens: 800,
        stream: false,
        n: 1,
      }),
    });
    const json = await response.json();
    return new Response(JSON.stringify(json.choices[0].message.content));
  } catch (e) {
    return new Response("Request cannot be processed!", {
      status: 400,
    });
  }
}