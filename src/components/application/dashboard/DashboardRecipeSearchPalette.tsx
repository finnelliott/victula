"use client";
import { useEffect, useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import { PlusCircleIcon } from '@heroicons/react/24/outline';
import { Recipe } from '@prisma/client';

type Item = {
    id: number
    name: string
    description: string
    calories: number
    fats: number
    carbohydrates: number
    proteins: number
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

async function getRecipes(query?: string) {
    return await fetch(`/api/recipes${query ? `?query=${query}` : ''}`).then((response) => response.json()) as Recipe[]
}

export default function DashboardRecipeSearchPalette() {
    const [query, setQuery] = useState('')

    const [recipes, setRecipes] = useState<Recipe[]>([]);

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
                {recipes.map((item) => (
                    <li key={item.id} className="py-4">
                        <div className="flex space-x-3 w-full">
                            <div className="flex-1 space-y-1">
                                <h3 className="text-sm font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500 pt-1">{item.description}</p>
                                <p className="text-sm text-gray-400">{item.calories}kcal | {item.carbohydrates}g Carbs | {item.proteins}g Protein | {item.fats}g Fats</p>
                            </div>
                            <button
                                type="button"
                                className="ml-4 flex-none text-gray-300 hover:text-gray-400"
                            >
                                <span className="sr-only">Add</span>
                                <PlusCircleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </li>
                ))}
                {recipes.length === 0 && (
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
                )}
            </ul>
        </div>
    </div>
  )
}
