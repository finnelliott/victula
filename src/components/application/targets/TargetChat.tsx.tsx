"use client";
import { ArrowUpIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TargetChat() {
    const [messages, setMessages] = useState([
        {
            role: "assistant",
            content: "Hello! I'm here to help you set nutrition goals. To get started, please tell me your age."
        }
    ])
    const [message, setMessage] = useState("")
    async function handleSubmit() {
        setMessage("")
        const addUserMessages = [...messages, { role: "user", content: message }]
        setMessages(addUserMessages)
        const res = await fetch(`/api/generate/targets`, {
            method: 'POST',
            body: JSON.stringify({
                messages: [
                    ...messages,
                    {
                        role: "user",
                        content: message
                    }
                ]
            })
        }).then(res => res.text())
        setMessages([...addUserMessages, { role: "assistant", content: res }])
    }
    return (
        <div className="h-full w-full relative">
            <div className="h-full w-full flex flex-col justify-start space-y-2 pb-16 overflow-y-scroll overflow-hidden p-4">
                {messages.map((message) => (
                    <div className={classNames(message.role == "user" ? "bg-indigo-600 text-white ml-auto border-indigo-800" : "bg-white text-gray-600 mr-auto border-gray-200", "rounded-lg p-3 border shadow max-w-[66%]")}>{message.content}</div>
                ))}
            </div>
            <form onSubmit={(e) => {e.preventDefault();handleSubmit()}}>
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={1} className="absolute left-0 right-0 w-auto bottom-0 min-h-[44px] pl-4 pr-12 py-4 focus:outline-none outline-indigo-700 focus:ring-1 focus:ring-indigo-700 bg-white text-gray-900 placeholder-neutral-600 shadow-lg border-t border-gray-300 border-x-0 border-b-0" placeholder="Type a message..." />
                <button type="submit" className="absolute p-1 right-4 bottom-0 mb-3 mr-2 z-20 bg-indigo-600 rounded-full"><ArrowUpIcon className="w-5 h-5 text-white"/></button>
            </form>
        </div>
    )
}