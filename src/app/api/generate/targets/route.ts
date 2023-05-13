if (!process.env.OPENAI_API_KEY) {
  throw new Error("Missing OpenAI API Key");
}

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4",
        messages: [
            { role: "system", content: `You're an assistant for helping set nutrition goals. You ask the user for details until you have sufficient data to help establish goals for calories, carbs, protein and fats.` },
            ...messages
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
    return new Response(json.choices[0].message.content);
  } catch (e) {
    return new Response("Request cannot be processed!", {
      status: 400,
    });
  }
}