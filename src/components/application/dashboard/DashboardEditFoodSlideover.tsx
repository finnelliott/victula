"use client";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Entry } from '@prisma/client';

export default function DashboardEditFoodSlideover({ entry, open, setOpen }: { entry: Entry, open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [ description, setDescription ] = useState(entry.description ?? "");
    const [ name, setName ] = useState(entry.name ?? "");
    const [ calories, setCalories ] = useState(entry.calories ?? 0);
    const [ carbohydrates, setCarbohydrates ] = useState(entry.carbohydrates ?? 0);
    const [ fats, setFats ] = useState(entry.fats ?? 0);
    const [ proteins, setProteins ] = useState(entry.proteins ?? 0);
    const [ loading, setLoading ] = useState(false);
    const [ consumedAtDate, setConsumedAtDate ] = useState(new Date(entry.consumed_at).toISOString().split("T")[0] ?? new Date().toISOString().split("T")[0]);
    const [ consumedAtTime, setConsumedAtTime ] = useState(new Date(entry.consumed_at).toTimeString().slice(0, 5) ?? new Date().toTimeString().slice(0, 5));
    async function handleGenerateNutritionFacts() {
        setLoading(true);
        try {
            const res = await fetch("/api/generate/nutrition-facts", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    description
                })
            })
        
            if (!res.ok) {
                throw new Error(res.statusText);
            }
        
            // This data is a ReadableStream
            const data = res.body;
            if (!data) {
                return;
            }
        
            const reader = data.getReader();
            const decoder = new TextDecoder();
            let done = false;
            let response = "";
        
            while (!done) {
                const { value, done: doneReading } = await reader.read();
                done = doneReading;
                const chunkValue = decoder.decode(value);
                response += chunkValue;
            }

            const { name, calories, fats, carbohydrates, proteins, error, assumptions } = JSON.parse(response);
            if (!name || !calories || !fats || !carbohydrates || !proteins) {
                alert(error);
            } else {
                if (assumptions) {
                    alert(assumptions);
                }
                setName(name);
                setCalories(calories);
                setFats(fats);
                setCarbohydrates(carbohydrates);
                setProteins(proteins);
            }
        } catch (error) {
            alert("We're sorry, we couldn't generate nutrition facts for this food.");
            console.error(error)
        }
        setLoading(false);
    }
    async function handleSaveEntry() {
        setLoading(true);
        const response = await fetch(`/api/entries/${entry.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                name,
                description,
                consumed_at: `${consumedAtDate}T${consumedAtTime}`,
                calories,
                carbohydrates,
                fats,
                proteins,
            }),
        })
        const data = await response.json()
        if (data.error) {
            console.log(data.error)
        } else {
            setOpen(false);
            location.reload()
        };
        setLoading(false);
    }
    return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-500"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                    <div className="px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                          Edit entry
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Loading overlay */}
                    {loading && (
                        <div className="absolute inset-0 bg-white z-10 flex items-center justify-center">
                            <div className="w-16 h-16 border border-white rounded-full animate-spin">
                                <div className="border-t-4 rounded-full border-gray-400 absolute left-0 top-0 w-full h-full" />
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}

                    {/* Select date & time of consumption */}
                    <div className="pb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="consumed_at_date" className="block text-sm font-medium text-gray-700">
                                Consumption date
                            </label>
                            <div className="mt-2">
                                <input
                                    type="date"
                                    id="consumed_at_date"
                                    name="consumed_at_date"
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="2 fried eggs on 2 slices of toast with 1 tsp of butter"
                                    value={consumedAtDate}
                                    onChange={(e) => setConsumedAtDate(new Date(e.target.value).toISOString().split("T")[0])}
                                />
                            </div>
                        </div>
                        <div>
                            <label htmlFor="consumed_at_time" className="block text-sm font-medium text-gray-700">
                                Consumption time
                            </label>
                            <div className="mt-2">
                                <input
                                    type="time"
                                    id="consumed_at_time"
                                    name="consumed_at_time"
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="2 fried eggs on 2 slices of toast with 1 tsp of butter"
                                    value={consumedAtTime}
                                    onChange={(e) => setConsumedAtTime(e.target.value)}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description of the food */}
                    <form onSubmit={(e) => {e.preventDefault();handleGenerateNutritionFacts();}}>
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="description"
                                    name="description"
                                    rows={6}
                                    className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                    placeholder="2 fried eggs on 2 slices of toast with 1 tsp of butter"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <p className="mt-2 text-sm text-gray-500">Where possible, include measurements, ingredients, cooking methods, and any other relevant information.</p>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full text-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                Generate nutrition facts
                            </button>
                        </div>
                    </form>
                    {/* Nutrition facts */}
                    <form onSubmit={(e) => {e.preventDefault();handleSaveEntry();}} className="mt-6 border-t border-gray-300 pt-6">
                        <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="Fried eggs on toast"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                                    Calories (kcal)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="calories"
                                        id="calories"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0"
                                        value={calories}
                                        onChange={(e) => setCalories(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="carbohydrates" className="block text-sm font-medium text-gray-700">
                                    Carbohydrates (g)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="carbohydrates"
                                        id="carbohydrates"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0"
                                        value={carbohydrates}
                                        onChange={(e) => setCarbohydrates(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="fats" className="block text-sm font-medium text-gray-700">
                                    Fats (g)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="fats"
                                        id="fats"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0"
                                        value={fats}
                                        onChange={(e) => setFats(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                            <div className="col-span-1">
                                <label htmlFor="proteins" className="block text-sm font-medium text-gray-700">
                                    Proteins (g)
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="number"
                                        name="proteins"
                                        id="proteins"
                                        className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                        placeholder="0"
                                        value={proteins}
                                        onChange={(e) => setProteins(parseInt(e.target.value))}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mt-6">
                            <button
                                type="submit"
                                className="w-full text-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
                            >
                                Update diary entry
                            </button>
                        </div>
                    </form>
                  </div>
                </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}
