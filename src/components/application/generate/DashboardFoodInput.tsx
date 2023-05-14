"use client";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

export default function DashboardFoodInput() {
    const [ generating, setGenerating ] = useState(false)
    const [ submittingEntry, setSubmittingEntry ] = useState(false)
    const [ description, setDescription ] = useState('')
    const [ entry, setEntry ] = useState<any>()
    async function submitDescription() {
        setGenerating(true)
        try {
            const response = await fetch('/api/generate', {
                method: 'POST',
                body: JSON.stringify({
                    type: "nutrition-facts",
                    description
                }),
            })
            const data = await response.json()
            setEntry({...JSON.parse(data), description})
        } catch (error) {
            console.error(error)
        }
        setGenerating(false)
    }
    async function submitEntry() {
        setSubmittingEntry(true)
        try {
            const response = await fetch('/api/entries', {
                method: 'POST',
                body: JSON.stringify({
                    description,
                    calories: entry.calories,
                    carbohydrates: entry.carbohydrates,
                    fats: entry.fats,
                    proteins: entry.proteins,
                    name: entry.name,
                }),
            })
            const data = await response.json()
            if (data.error) {
                alert(data.error)
            } else {
                location.reload()
                setEntry(null)
                setDescription('')
            }
        } catch (error) {
            console.error(error)
        }
        setSubmittingEntry(false)
    }
    return (
        <form onSubmit={(e) => {e.preventDefault();submitDescription();}} className="relative">
          <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600 bg-white">
            {(generating || submittingEntry) && <>
            <div className="overflow-hidden rounded-lg ring-1 ring-inset ring-gray-300  absolute z-30 inset-0 pointer-events-none w-full bg-white" aria-hidden="true" />
            <div className="overflow-hidden rounded-lg ring-1 ring-inset ring-gray-300  absolute z-40 inset-0 pointer-events-none w-full bg-transparent justify-center items-center text-gray-600 animate-pulse duration-1000 ease-in-out flex flex-col" aria-hidden="true" >
                <svg className="w-8 h-8 stroke-1 stroke-current animate-spin" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1" stroke="current" />
                </svg>
                <span className="mt-4">{generating ? "Generating diary entry..." : "Adding to diary..."}</span>
            </div>
            </>}
            {entry && <>
                <div className="overflow-hidden rounded-lg ring-1 ring-inset ring-gray-300  absolute z-10 inset-0 w-full bg-white p-8 flex flex-col lg:flex-row space-between" aria-hidden="true">
                    <div className="flex-1 w-5/6 flex flex-col justify-center">
                        <h3 className="font-medium text-lg text-gray-800">{entry.name}</h3>
                        <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                            <div><span className="text-gray-400">Energy </span>{entry.calories}kcal</div>
                            <div><span className="text-gray-400">Protein </span>{entry.proteins}g</div>
                            <div><span className="text-gray-400">Carbs </span>{entry.carbohydrates}g</div>
                            <div><span className="text-gray-400">Fat </span>{entry.fats}g</div>
                        </div>
                        {entry.description && <div className="max-w-full"><p className="text-gray-600 text-xs mt-2 truncate leading-5 h-5">{entry.description}</p></div>}
                    </div>
                    <div className="flex flex-row space-x-2 flex-none lg:h-full justify-center items-center w-full lg:w-auto">
                        <button
                            type="button"
                            onClick={() => setEntry(null)}
                            className="w-1/2 lg:w-auto rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            onClick={() => submitEntry()}
                            className="w-1/2 lg:w-auto rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        >
                            Add to diary
                        </button>
                    </div>
                </div>
            </>}
            <label htmlFor="food-description" className="sr-only">
            Give a detailed description of the food you would like to add to your diary. For best results, include any ingredients, cooking methods, or other relevant information.
            </label>
            <textarea
              rows={3}
              name="food-description"
              id="food-description"
              className="block w-full resize-none border-0 bg-transparent p-8 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              placeholder="Give a detailed description of the food you would like to add to your diary. For best results, include any ingredients, cooking methods, or other relevant information."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            {/* Spacer element to match the height of the toolbar */}
            <div className="py-2" aria-hidden="true">
              {/* Matches height of button in toolbar (1px border + 36px content height) */}
              <div className="py-px">
                <div className="h-9" />
              </div>
            </div>
          </div>

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-8 pl-8 pr-8">
            <div className="flex-shrink-0">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-indigo-600 px-2 py-2 text-base font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                <ArrowLongRightIcon className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </form>
    )
}