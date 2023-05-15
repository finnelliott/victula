import { ChartPieIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { User } from "@prisma/client";
import TargetsEditSlideover from "./TargetsEditSlideover";

export default function TargetsDisplay({ user }: { user: User }) {
    // Check if the user has any targets
    const targetsSet = user.target_calories && user.target_proteins && user.target_carbohydrates && user.target_fats;

    if (!targetsSet) {
        return (
        <div className="text-center px-8 py-16">
            <h3 className="text-md font-semibold text-gray-900">No targets set</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by creating some targets.</p>
        </div>
        )
    } else {
        return (
            <>
            <div className="px-8 py-6 flex justify-between items-center space-x-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Calories</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.target_calories}kcal</dd>
            </div>
            <div className="px-8 py-6 flex justify-between items-center space-x-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Carbohydrates</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.target_carbohydrates}g</dd>
            </div>
            <div className="px-8 py-6 flex justify-between items-center space-x-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Proteins</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.target_proteins}g</dd>
            </div>
            <div className="px-8 py-6 flex justify-between items-center space-x-4">
                <dt className="text-sm font-medium leading-6 text-gray-900">Fats</dt>
                <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.target_fats}g</dd>
            </div>
            {
                user.targets_context &&
                <div className="px-8 py-6 flex justify-between items-center space-x-4">
                    <dt className="text-sm font-medium leading-6 text-gray-900">Context</dt>
                    <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{user.targets_context}</dd>
                </div>
            }
            </>
        )
    }
}