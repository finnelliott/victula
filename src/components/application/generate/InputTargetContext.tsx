"use client";

import { useState } from "react";

export default function InputTargetContext() {
    const [ gender, setGender ] = useState("");
    const [ age, setAge ] = useState(0);
    const [ height, setHeight ] = useState("");
    const [ weight, setWeight ] = useState("");
    const [ activityLevel, setActivityLevel ] = useState("");
    const [ goal, setGoal ] = useState("");
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        try {
            const response = await fetch("/api/generate/targets", {
                method: 'POST',
                body: JSON.stringify({
                    gender,
                    age,
                    height,
                    weight,
                    activityLevel,
                    goal
                })
            }).then(res => res.json());
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <form onSubmit={handleSubmit}>
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
    );
}