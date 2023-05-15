"use client";
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { User } from '@prisma/client';

function ManualTargetsUpdate({ user, loading, setLoading }: { user: User, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [ targetCalories, setTargetCalories ] = useState(user.target_calories ?? 0);
    const [ targetCarbohydrates, setTargetCarbohydrates ] = useState(user.target_carbohydrates ?? 0);
    const [ targetFats, setTargetFats ] = useState(user.target_fats ?? 0);
    const [ targetProteins, setTargetProteins ] = useState(user.target_proteins ?? 0);
    async function handleUpdateTargets() {
        setLoading(true);
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
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
        location.reload();
    }
    return (
        <form onSubmit={(e) => {e.preventDefault();handleUpdateTargets();}} className="space-y-4">
            <div>
                <label htmlFor="target-calories" className="block text-sm font-medium leading-6 text-gray-900">
                    Calories
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-calories"
                    id="target-calories"
                    value={targetCalories}
                    onChange={(e) => setTargetCalories(parseFloat(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            
            <div>
                <label htmlFor="target-carbohydrates" className="block text-sm font-medium leading-6 text-gray-900">
                    Carbohydrates
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-carbohydrates"
                    id="target-carbohydrates"
                    value={targetCarbohydrates}
                    onChange={(e) => setTargetCarbohydrates(parseFloat(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>

            <div>
                <label htmlFor="target-fats" className="block text-sm font-medium leading-6 text-gray-900">
                    Fats
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-fats"
                    id="target-fats"
                    value={targetFats}
                    onChange={(e) => setTargetFats(parseFloat(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                </div>
            </div>

            <div>
                <label htmlFor="target-proteins" className="block text-sm font-medium leading-6 text-gray-900">
                    Proteins
                </label>
                <div className="mt-2">
                    <input
                    type="number"
                    name="target-proteins"
                    id="target-proteins"
                    value={targetProteins}
                    onChange={(e) => setTargetProteins(parseFloat(e.target.value))}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                </div>
            </div>
            <div className="pt-2">
                <button
                    type="submit"
                    className="w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                    Save targets
                </button>
            </div>
        </form>
    )
}

function AssistedTargetsUpdate({ user, loading, setLoading }: { user: User, loading: boolean, setLoading: React.Dispatch<React.SetStateAction<boolean>> }) {
    // Context variables
    const [ gender, setGender ] = useState("");
    const [ age, setAge ] = useState(0);
    const [ height, setHeight ] = useState("");
    const [ weight, setWeight ] = useState("");
    const [ activityLevel, setActivityLevel ] = useState("");
    const [ weightGoals, setWeightGoals ] = useState("");

    // Target variables
    const [ targetCalories, setTargetCalories ] = useState(user.target_calories ?? 0);
    const [ targetCarbohydrates, setTargetCarbohydrates ] = useState(user.target_carbohydrates ?? 0);
    const [ targetFats, setTargetFats ] = useState(user.target_fats ?? 0);
    const [ targetProteins, setTargetProteins ] = useState(user.target_proteins ?? 0);


    const [ targetsGenerated, setTargetsGenerated ] = useState(false);

    async function handleUpdateTargets() {
        setLoading(true);
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
        } catch (error) {
            console.error(error)
        }
        setLoading(false);
        location.reload();
    }

    async function handleGenerateTargets() {
        setLoading(true);
        try {
            const res = await fetch("/api/generate/nutrition-targets", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    gender,
                    age,
                    height,
                    weight,
                    activityLevel,
                    weightGoals
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
            const { target_calories, target_carbohydrates, target_fats, target_proteins, error, assumptions } = JSON.parse(response);
            if (!target_calories || !target_carbohydrates || !target_fats || !target_proteins) {
                alert("Error generating targets: " + error);
            } else {
                if (assumptions) {
                    alert("Targets generated with assumptions: " + assumptions);
                }
                setTargetCalories(target_calories);
                setTargetCarbohydrates(target_carbohydrates);
                setTargetFats(target_fats);
                setTargetProteins(target_proteins);
            }
        } catch (error) {
            console.error(error)
        }
        setTargetsGenerated(true)
        setLoading(false);
    }

    return (
        <div>
            {!targetsGenerated ? <form onSubmit={(e) => {e.preventDefault();handleGenerateTargets();}}>
                <div className="grid grid-cols-1 gap-x-6 gap-y-6 sm:grid-cols-6">
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
                            value={weightGoals}
                            onChange={(e) => setWeightGoals(e.target.value)}
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                            <p className="mt-2 text-sm text-gray-500">Would you like to lose, maintain or gain weight?</p>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-6">
                    <button
                        type="submit"
                        className="w-full text-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Generate targets
                    </button>
                </div>
            </form>
            :
            <form onSubmit={(e) => {e.preventDefault();handleUpdateTargets();}} className="space-y-4">
                <div>
                    <label htmlFor="target-calories" className="block text-sm font-medium leading-6 text-gray-900">
                        Calories
                    </label>
                    <div className="mt-2">
                        <input
                        type="number"
                        name="target-calories"
                        id="target-calories"
                        value={targetCalories}
                        onChange={(e) => setTargetCalories(parseFloat(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                
                <div>
                    <label htmlFor="target-carbohydrates" className="block text-sm font-medium leading-6 text-gray-900">
                        Carbohydrates
                    </label>
                    <div className="mt-2">
                        <input
                        type="number"
                        name="target-carbohydrates"
                        id="target-carbohydrates"
                        value={targetCarbohydrates}
                        onChange={(e) => setTargetCarbohydrates(parseFloat(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
    
                <div>
                    <label htmlFor="target-fats" className="block text-sm font-medium leading-6 text-gray-900">
                        Fats
                    </label>
                    <div className="mt-2">
                        <input
                        type="number"
                        name="target-fats"
                        id="target-fats"
                        value={targetFats}
                        onChange={(e) => setTargetFats(parseFloat(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    </div>
                </div>
    
                <div>
                    <label htmlFor="target-proteins" className="block text-sm font-medium leading-6 text-gray-900">
                        Proteins
                    </label>
                    <div className="mt-2">
                        <input
                        type="number"
                        name="target-proteins"
                        id="target-proteins"
                        value={targetProteins}
                        onChange={(e) => setTargetProteins(parseFloat(e.target.value))}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="pt-2 flex flex-col space-y-2">
                    <button 
                        type="button"
                        onClick={() => setTargetsGenerated(false)}
                        className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    >
                        Try again
                    </button>
                    <button
                        type="submit"
                        className="w-full text-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Save targets
                    </button>
                </div>
            </form>
            }
        </div>
    )
    
}
  
function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

export default function TargetsEditSlideover({ open, setOpen, user }: { open: boolean, setOpen: React.Dispatch<React.SetStateAction<boolean>>, user: User }) {
    const [ loading, setLoading ] = useState(false);
    const [ manual, setManual ] = useState(true);
    const tabs = [
        { name: 'Manual', current: manual },
        { name: 'Assisted', current: !manual },
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
                          Edit targets
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

                    {/* Select manual or assisted update interface */}
                    <div className='pb-6'>
                        <div className="block border border-gray-300 rounded-lg">
                            <nav className="isolate flex divide-x divide-gray-200" aria-label="Tabs">
                            {tabs.map((tab, tabIdx) => (
                                <button
                                onClick={() => (tab.name === 'Manual') ? setManual(true) : setManual(false)}
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

                    {/* Manually update existing targets */}
                    {manual && <ManualTargetsUpdate user={user} loading={loading} setLoading={setLoading} />}

                    {/* Assisted update of existing targets */}
                    {!manual && <AssistedTargetsUpdate user={user} loading={loading} setLoading={setLoading} />}
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
