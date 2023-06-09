import { InformationCircleIcon, PlusIcon } from "@heroicons/react/20/solid";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Hero() {
    return (
        <div className="relative">
        <div className="rounded-md bg-blue-50 p-4 flex justify-center">
            <div className="flex">
                <div className="flex-shrink-0">
                <InformationCircleIcon className="h-5 w-5 text-blue-400" aria-hidden="true" />
                </div>
                <div className="ml-3 flex-1 md:flex md:justify-between">
                <p className="text-sm text-blue-700">The Victula project is still in the ideation stage. Please be aware that it may be discontinued as a project.</p>
                </div>
            </div>
        </div>
        <section className="relative w-full py-24 flex flex-col items-center justify-center text-center px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-light capitalize">The easiest way to track your&nbsp;nutrition.</h1>
            <p className="text-xl font-light mt-4">Victula is a simple, easy-to-use nutrition tracker that helps you stay on top of what you&apos;re&nbsp;eating.</p>
            <Link href="/app">
                <button
                    type="button"
                    className="mt-8 animate-pulse inline-flex items-center rounded-full bg-white px-3.5 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                    <span className="mr-2">Try it out – it&apos;s free!</span>
                    <ArrowLongRightIcon className="w-5 h-5 text-gray-700" />
                </button>
            </Link>
            <div className="aspect-video bg-black rounded-2xl overflow-hidden w-full max-w-2xl mt-16 shadow-2xl" />
        </section>
        </div>
    )
}