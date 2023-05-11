import { Webhook } from "svix";
import { buffer } from "micro";
import { NextApiRequest, NextApiResponse } from "next";
import { WebhookEvent } from "@clerk/nextjs/server";
import prisma from "../../../prisma/prismadb";

export const config = {
    api: {
        bodyParser: false,
    },
}

if (!process.env.CLERK_WEBHOOK_SECRET) throw new Error("No webhook secret found")
const secret = process.env.CLERK_WEBHOOK_SECRET as string;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const payload = (await buffer(req)).toString();
    const headers = req.headers;

    const wh = new Webhook(secret);
    let msg;
    try {
        // @ts-ignore
        msg = wh.verify(payload, headers);
    } catch (err) {
        res.status(400).json({});
    }

    // Do something with the message...
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
    return res.status(200).json({});
}