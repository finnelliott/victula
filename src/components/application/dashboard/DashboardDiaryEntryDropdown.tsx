"use client";
import { Fragment, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import Link from 'next/link';
import DashboardEditFoodSlideover from './DashboardEditFoodSlideover';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function DashboardDiaryEntryDropdown({ entry }: { entry: any }) {
    const [editEntrySlideoverOpen, setEditEntrySlideoverOpen] = useState(false);
    async function deleteEntry(id: string) {
        const res = await fetch(`/api/entries/${id}`, {
            method: 'DELETE',
        })
        if (res.ok) {
            location.reload();
        }
    }
    return (
        <Menu as="div" className="relative flex-none">
        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
            <span className="sr-only">Open options</span>
            <EllipsisVerticalIcon className="h-5 w-5" aria-hidden="true" />
        </Menu.Button>
        <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
        >
            <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
            <Menu.Item>
                {({ active }) => (
                <button
                    onClick={() => setEditEntrySlideoverOpen(true)}
                    className={classNames(
                    active ? 'bg-gray-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-gray-900 w-full text-left'
                    )}
                >
                    Edit<span className="sr-only">, {entry.name}</span>
                </button>
                )}
            </Menu.Item>
            <Menu.Item>
                {({ active }) => (
                <button
                    onClick={() => deleteEntry(entry.id)}
                    className={classNames(
                    active ? 'bg-red-50' : '',
                    'block px-3 py-1 text-sm leading-6 text-red-800 w-full text-left'
                    )}
                >
                    Delete<span className="sr-only">, {entry.name}</span>
                </button>
                )}
            </Menu.Item>
            </Menu.Items>
        </Transition>
        <DashboardEditFoodSlideover entry={entry} open={editEntrySlideoverOpen} setOpen={setEditEntrySlideoverOpen} />
        </Menu>
    )
}