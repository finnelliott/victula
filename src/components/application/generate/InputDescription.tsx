"use client";
import { ArrowLongRightIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react"

export default function InputDescription() {
    const [ generating, setGenerating ] = useState(false)
    const [ submittingEntry, setSubmittingEntry ] = useState(false)
    const [ description, setDescription ] = useState('')
    const [ entry, setEntry ] = useState<any>()
    async function submitDescription() {
        setGenerating(true)
        try {
            const response = await fetch('/api/entries/generate-nutrition-facts', {
                method: 'POST',
                body: JSON.stringify({
                    description
                }),
            })
            const data = await response.json()
            setEntry(JSON.parse(data))
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
          <div className="overflow-hidden rounded-lg shadow-xl ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-indigo-600">
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
                <div className="overflow-hidden rounded-lg ring-1 ring-inset ring-gray-300  absolute z-10 inset-0 w-full bg-white space-y-4 p-8 flex flex-row space-between" aria-hidden="true">
                    <div className="flex flex-col flex-1 h-full justify-between">
                        <h2 className="text-lg font-medium text-gray-800">{entry.name}</h2>
                        <div className="text-gray-600">{entry.calories}kcal | Carbs {entry.carbohydrates}g | Protein {entry.proteins}g | Fats {entry.fats}g</div>
                    </div>
                    <div className="flex flex-col flex-none h-full justify-center">
                        <button type="button" onClick={() => submitEntry()} className="px-4 py-2 bg-indigo-600 text-white rounded-md">Add to diary</button>
                        <button type="button" onClick={() => setEntry("")} className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md">Cancel</button>
                    </div>
                </div>
            </>}
            <label htmlFor="food-description" className="sr-only">
              Describe the food you would like to add to your diary
            </label>
            <textarea
              rows={3}
              name="food-description"
              id="food-description"
              className="block w-full resize-none border-0 bg-transparent py-4 px-4 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-base sm:leading-6"
              placeholder="Describe the food you would like to add to your diary"
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

          <div className="absolute inset-x-0 bottom-0 flex justify-end py-4 pl-4 pr-4">
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