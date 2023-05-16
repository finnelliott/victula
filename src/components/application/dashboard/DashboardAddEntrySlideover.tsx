"use client";
import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { Recipe } from '@prisma/client';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

async function getRecipes(query?: string) {
    return await fetch(`/api/recipes${query ? `?query=${query}` : ''}`).then((response) => response.json()) as Recipe[]
}

function CreateEntryFromPreviousRecipe({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [query, setQuery] = useState('')

    const [recipes, setRecipes] = useState<Recipe[] | null>();

    useEffect(() => {
        async function fetchRecipes() {
            const data = await getRecipes();
            setRecipes(data);
        }
        fetchRecipes();
    }, []);

    useEffect(() => {
        async function fetchRecipes() {
            const data = await getRecipes(query);
            setRecipes(data);
        }
        fetchRecipes();
    }, [query]);

    async function handleSaveEntry(recipe: Recipe) {
        setLoading(true);
        const response = await fetch('/api/entries', {
            method: 'POST',
            body: JSON.stringify({
                recipe_id: recipe.id,
                name: recipe.name,
                description: recipe.description,
                calories: recipe.calories,
                carbohydrates: recipe.carbohydrates,
                fats: recipe.fats,
                proteins: recipe.proteins,
            }),
        })
        const data = await response.json()
        if (data.error) {
            console.log(data.error)
            alert("Sorry, there was an error saving your entry.")
        } else {
            location.reload()
        };
        setLoading(false);
    }

    return (
    <div>
        <div>
            <label htmlFor="search" className="sr-only">
                Search
            </label>
            <div className="relative mt-2 rounded-md shadow-sm">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                    type="text"
                    name="search"
                    id="search"
                    className="block w-full rounded-md border-0 py-1.5 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                />
            </div>
        </div>
        <div className="mt-4">
            <ul className="divide-y divide-gray-200">
                {!recipes ? 
                    <li className="py-4">
                        <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">Loading...</h3>
                                </div>
                            </div>
                        </div>
                    </li>
                :
                recipes?.length === 0 ? (
                    <li className="py-4">
                        <div className="flex space-x-3">
                            <div className="flex-1 space-y-1">
                                <div className="flex items-center justify-between">
                                    <h3 className="text-sm font-medium">No results found</h3>
                                </div>
                                <div className="text-sm text-gray-500">
                                    <p>
                                        Try adjusting your search or filter to find what you're looking&nbsp;for.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                ) : (
                    recipes?.map((item) => (
                        <li key={item.id} className="py-4">
                            <div className="flex space-x-3 w-full">
                                <div className="flex-1 space-y-1">
                                    <h3 className="text-sm font-medium">{item.name}</h3>
                                    <p className="text-sm text-gray-500 pt-1">{item.description}</p>
                                    <p className="text-sm text-gray-400">{item.calories}kcal | {item.carbohydrates}g Carbs | {item.proteins}g Protein | {item.fats}g Fats</p>
                                </div>
                                <button
                                    onClick={() => handleSaveEntry(item)}
                                    type="button"
                                    className="ml-4 flex-none text-gray-300 hover:text-gray-400"
                                >
                                    <span className="sr-only">Add</span>
                                    <PlusCircleIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </li>
                    ))
                )}
            </ul>
        </div>
    </div>
    )
}

function CreateEntryFromNewRecipe({ setLoading }: { setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [ description, setDescription ] = useState("");
    const [ name, setName ] = useState("");
    const [ calories, setCalories ] = useState(0);
    const [ carbohydrates, setCarbohydrates ] = useState(0);
    const [ fats, setFats ] = useState(0);
    const [ proteins, setProteins ] = useState(0);
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
                    alert("Nutrition facts generated with assumptions: " + assumptions);
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
        const response = await fetch('/api/entries', {
            method: 'POST',
            body: JSON.stringify({
                name,
                description,
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
            location.reload()
        };
        setLoading(false);
    }
    return (
        <div>
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
                            className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                    <div className="col-span-1">
                        <label htmlFor="calories" className="block text-sm font-medium text-gray-700">
                            Calories (kcal)
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                name="calories"
                                id="calories"
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                                className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
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
                        className="w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save to diary
                    </button>
                </div>
            </form>
        </div>
    )
}

export default function DashboardAddEntrySlideover({ open, setOpen }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [ loading, setLoading ] = useState(false);
    const [ previous, setPrevious ] = useState(false);
    const tabs = [
        { name: 'New recipe', current: !previous },
        { name: 'Use previous', current: previous },
    ]
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
                          Add entry
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
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

                    {/* Select new or existing recipe */}
                    <div className='pb-6'>
                        <div className="block border border-gray-300 rounded-lg">
                            <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
                            {tabs.map((tab, tabIdx) => (
                                <button
                                onClick={() => (tab.name === 'Use previous') ? setPrevious(true) : setPrevious(false)}
                                key={tab.name}
                                className={classNames(
                                    tab.current ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700',
                                    tabIdx === 0 ? 'rounded-l-lg' : '',
                                    tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                                    'group relative min-w-0 flex-1 overflow-hidden bg-gray-50 py-4 px-4 text-center text-sm font-medium hover:bg-gray-50 focus:z-10'
                                )}
                                aria-current={tab.current ? 'page' : undefined}
                                >
                                <span>{tab.name}</span>
                                <span
                                    aria-hidden="true"
                                    className={classNames(
                                    tab.current ? 'bg-indigo-500' : 'bg-transparent',
                                    'absolute inset-x-0 bottom-0 h-0.5'
                                    )}
                                />
                                </button>
                            ))}
                            </nav>
                        </div>
                    </div>

                    {
                        previous ?
                        // If previous selected, render the form for creating a new entry from a previous recipe
                        <CreateEntryFromPreviousRecipe setLoading={setLoading} />
                        :
                        // If new recipe selected, render the form for creating a new entry from a new recipe
                        <CreateEntryFromNewRecipe setLoading={setLoading} />
                    }

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
