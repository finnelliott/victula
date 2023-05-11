import type { WebhookEvent } from "@clerk/clerk-sdk-node";
import { headers } from 'next/headers';
import prisma from "../../../../prisma/prismadb";

import { Webhook } from "svix";
import { buffer } from "micro";

export const config = {
    api: {
        bodyParser: false,
    },
}

if (!process.env.CLERK_WEBHOOK_SECRET) throw new Error("No webhook secret found")

export async function POST(request: Request) {
    const req = await request.json();
    const payload = (await buffer(req)).toString();
    const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET as string);
    let msg;
    try {
        msg = wh.verify(payload, req.headers);
    } catch (err) {
        return new Response("Invalid webhook signature", {
            status: 401,
        })
    }

    const evt = req.body.evt as WebhookEvent; 
    switch (evt.type) {
        case 'user.created': // this is typed
            const user = await prisma.user.create({
                data: {
                    clerkId: evt.data.id,
                }
            })
            break;
    }
    return new Response("Webhook received")
}