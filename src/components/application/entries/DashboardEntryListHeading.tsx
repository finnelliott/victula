"use client";
import { PlusIcon } from "@heroicons/react/20/solid";
import { useState } from "react";
import CreateEntrySlideover from "./CreateEntrySlideover";
import { Entry } from "@prisma/client";

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardEntryListHeading({ entries }: { entries: Entry[] }) {
    const [createEntryModalOpen, setCreateEntryModalOpen] = useState(false);
    return (
        <div className="flex w-full justify-between items-center p-8 border-b border-gray-300">
            <CreateEntrySlideover open={createEntryModalOpen} setOpen={setCreateEntryModalOpen} />
                <h2 className="text-2xl font-semibold text-gray-900">Diary</h2>
                <button
                    type="button"
                    onClick={() => setCreateEntryModalOpen(true)}
                    className={classNames(entries.length == 0 ? "animate-pulse" : "", "inline-flex items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50")}
                >
                    <PlusIcon className="w-5 h-5 text-gray-700" />
                    <span className="ml-2">Add food</span>
                </button>
        </div>
    )
}