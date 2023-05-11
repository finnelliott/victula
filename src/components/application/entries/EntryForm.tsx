"use client";

import { useState } from "react";

export default function EntryForm() {
    const [description, setDescription] = useState("");
    const [calories, setCalories] = useState("");
    const [carbohydrates, setCarbohydrates] = useState("");
    const [fats, setFats] = useState("");
    const [protein, setProtein] = useState("");
    const handleSubmit = async () => {
        const response = await fetch(`/api/entries/generate-nutrition-facts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ description }),
        }).then(res => res.json());
        alert(response);
        const { calories, carbohydrates, fats, protein } = JSON.parse(response);
        setCalories(calories);
        setCarbohydrates(carbohydrates);
        setFats(fats);
        setProtein(protein);
    }
    return (
        <>
        <form onSubmit={(e) => {e.preventDefault();handleSubmit()}} className="bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

              <div className="col-span-full">
                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                  Describe your meal
                </label>
                <div className="mt-2">
                  <textarea
                    id="about"
                    name="about"
                    rows={3}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">For best results, include specifics such as weights, measurements and cooking methods.</p>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        <form className="mt-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl md:col-span-2">
          <div className="px-4 py-6 sm:p-8">
            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-3">
                <label htmlFor="calories" className="block text-sm font-medium leading-6 text-gray-900">
                  Calories
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="calories"
                    id="calories"
                    value={calories}
                    onChange={(e) => setCalories(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="carbohydrates" className="block text-sm font-medium leading-6 text-gray-900">
                    Carbohydrates
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="carbohydrates"
                    id="carbohydrates"
                    value={carbohydrates}
                    onChange={(e) => setCarbohydrates(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="fats" className="block text-sm font-medium leading-6 text-gray-900">
                  Fats
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="fats"
                    id="fats"
                    value={fats}
                    onChange={(e) => setFats(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label htmlFor="protein" className="block text-sm font-medium leading-6 text-gray-900">
                    Protein
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="protein"
                    id="protein"
                    value={protein}
                    onChange={(e) => setProtein(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

            </div>
          </div>
          <div className="flex items-center justify-end gap-x-6 border-t border-gray-900/10 px-4 py-4 sm:px-8">
            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
        </>
    )
}