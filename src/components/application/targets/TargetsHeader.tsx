"use client";
import { ChartPieIcon } from "@heroicons/react/20/solid";
import { User } from "@prisma/client";
import { useState } from "react"
import TargetsEditSlideover from "./TargetsEditSlideover";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TargetsHeader({ user }: { user: User }) {
    const [ editTargetsModalOpen, setEditTargetsModalOpen ] = useState(false)
    const targetsSet = user.target_calories && user.target_carbohydrates && user.target_fats && user.target_proteins;
    return (
        <div className="w-full flex justify-between items-center p-8">
                <h1 className="text-2xl font-semibold text-gray-900">Targets</h1>
                <button
                    type="button"
                    onClick={() => setEditTargetsModalOpen(true)}
                    className={classNames(!targetsSet ? "animate-pulse" : "", "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50")}
                >
                    <ChartPieIcon className="w-5 h-5 text-gray-700" />
                    <span className="ml-2">{targetsSet ? "Edit targets": "Create targets"}</span>
                </button>
                <TargetsEditSlideover open={editTargetsModalOpen} setOpen={setEditTargetsModalOpen} user={user} />
        </div>
    )
}