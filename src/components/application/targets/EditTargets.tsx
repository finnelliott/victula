"use client";
import { useState } from "react";
import { User } from "@prisma/client";

export default function EditTargets({ user }: { user: User }) {
    const { target_calories, target_carbohydrates, target_fats, target_proteins } = user;
    const [targetCalories, setTargetCalories] = useState(target_calories?.toString());
    const [targetCarbohydrates, setTargetCarbohydrates] = useState(target_carbohydrates?.toString());
    const [targetFats, setTargetFats] = useState(target_fats?.toString());
    const [targetProteins, setTargetProteins] = useState(target_proteins?.toString());
    async function handleSaveTargets(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("/api/users", {
                method: 'PUT',
                body: JSON.stringify({
                    target_calories: targetCalories,
                    target_carbohydrates: targetCarbohydrates,
                    target_fats: targetFats,
                    target_proteins: targetProteins
                })
            })
            if (response.ok) {
                alert("Targets saved!")
            }
        } catch (error) {
            console.error(error)
        }
    }
    async function handleClearTargets() {
        try {
            const response = await fetch("/api/users", {
                method: 'PUT',
                body: JSON.stringify({
                    target_calories: null,
                    target_carbohydrates: null,
                    target_fats: null,
                    target_proteins: null
                })
            })
            if (response.ok) {
                alert("Targets cleared!");
                location.reload();
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSaveTargets}>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="target-calories" className="block text-sm font-medium leading-6 text-gray-900">
                    Calories
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-calories"
                    id="target-calories"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            
            <div className="sm:col-span-3">
                <label htmlFor="target-carbohydrates" className="block text-sm font-medium leading-6 text-gray-900">
                    Carbohydrates
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-carbohydrates"
                    id="target-carbohydrates"
                    value={targetCarbohydrates}
                    onChange={(e) => setTargetCarbohydrates(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="target-fats" className="block text-sm font-medium leading-6 text-gray-900">
                    Fats
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-fats"
                    id="target-fats"
                    value={targetFats}
                    onChange={(e) => setTargetFats(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="target-proteins" className="block text-sm font-medium leading-6 text-gray-900">
                    Proteins
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-proteins"
                    id="target-proteins"
                    value={targetProteins}
                    onChange={(e) => setTargetProteins(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
        </div>
        <div className="flex justify-between items-center mt-8 space-x-2">
            <button onClick={() => handleClearTargets()} type="button" className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                Clear Targets
            </button>
            <button
                type="submit"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save targets
            </button>
        </div>
        </form>
    )
}