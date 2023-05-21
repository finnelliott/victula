export async function POST(request: Request) {
    const { description } = await request.json();
    return new Response(description);
}