"use client";

import { useState } from "react";

export default function InputTargetContext() {
    const [ gender, setGender ] = useState("");
    const [ age, setAge ] = useState(0);
    const [ height, setHeight ] = useState("");
    const [ weight, setWeight ] = useState("");
    const [ activityLevel, setActivityLevel ] = useState("");
    const [ goal, setGoal ] = useState("");
    const [ generating, setGenerating ] = useState(false)
    const [ targetCalories, setTargetCalories ] = useState<string | undefined>()
    const [ targetCarbohydrates, setTargetCarbohydrates ] = useState<string | undefined>()
    const [ targetFats, setTargetFats ] = useState<string | undefined>()
    const [ targetProteins, setTargetProteins ] = useState<string | undefined>()
    // const [response, setResponse] = useState<string>("");
    async function handleGenerateTargets(e: React.FormEvent) {
        e.preventDefault();
        setGenerating(true);
        try {
            const res = await fetch("/api/generate", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    type: "nutrition-targets",
                    gender,
                    age,
                    height,
                    weight,
                    activityLevel,
                    goal
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
                // setResponse((prev) => prev + chunkValue);
                response += chunkValue;
            }
            alert(response)
            const { target_calories, target_carbohydrates, target_fats, target_proteins } = JSON.parse(response);
            alert(target_calories)
            setTargetCalories(target_calories);
            setTargetCarbohydrates(target_carbohydrates);
            setTargetFats(target_fats);
            setTargetProteins(target_proteins);
        } catch (error) {
            console.error(error)
        }
        setGenerating(false)
    }
    async function handleSaveTargets(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users`, {
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
                location.reload();
            }
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <div className="relative">
        {generating && 
        <div className="absolute w-full h-full bg-white flex items-center justify-center space-y-4 flex-col text-gray-600">
            <svg className="w-8 h-8 stroke-1 stroke-current animate-spin" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25 13C25 19.6274 19.6274 25 13 25C6.37258 25 1 19.6274 1 13C1 6.37258 6.37258 1 13 1" stroke="current" />
            </svg>
            <span className="mt-4">Generating targets...</span>
        </div>}
        {targetCalories ? 
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
        <div className="flex justify-end">
            <button
                type="submit"
                className="mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Save targets
            </button>
        </div>
        </form>
        :
        <form onSubmit={handleGenerateTargets}>
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
            <div className="sm:col-span-3">
                <label htmlFor="gender" className="block text-sm font-medium leading-6 text-gray-900">
                    Gender
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="gender"
                    id="gender"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="age" className="block text-sm font-medium leading-6 text-gray-900">
                    Age
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={(e) => setAge(Number(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="height" className="block text-sm font-medium leading-6 text-gray-900">
                    Height (include units)
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="height"
                    id="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-3">
                <label htmlFor="weight" className="block text-sm font-medium leading-6 text-gray-900">
                    Weight (include units)
                </label>
                <div className="mt-2">
                    <input
                    type="text"
                    name="weight"
                    id="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div className="sm:col-span-6">
                <label htmlFor="activity-level" className="block text-sm font-medium leading-6 text-gray-900">
                    Activity level
                </label>
                <div className="mt-2">
                    <textarea
                    name="activity-level"
                    id="activity-level"
                    value={activityLevel}
                    onChange={(e) => setActivityLevel(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="mt-2 text-sm text-gray-500">How many times a week do you exercise? How long do you exercise for? What type of exercise do you do?</p>
                </div>
            </div>

            <div className="sm:col-span-6">
                <label htmlFor="weight-goals" className="block text-sm font-medium leading-6 text-gray-900">
                    Weight goals
                </label>
                <div className="mt-2">
                    <textarea
                    name="weight-goals"
                    id="weight-goals"
                    value={goal}
                    onChange={(e) => setGoal(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <p className="mt-2 text-sm text-gray-500">Would you like to lose, maintain or gain weight?</p>
                </div>
            </div>
        </div>
        <div className="flex justify-end">
            <button
                type="submit"
                className="mt-8 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
                Generate targets
            </button>
        </div>
        </form>
        }
        </div>
    );
}