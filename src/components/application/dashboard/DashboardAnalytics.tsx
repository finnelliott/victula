import { Entry, User } from "@prisma/client";
import Link from "next/link";

type NutrientType = {
    name: 'calories' | 'carbohydrates' | 'fats' | 'proteins',
    measure: string
};

const nutrients: NutrientType[] = [
    { name: 'calories', measure: 'kcal' },
    { name: 'carbohydrates', measure: 'g' },
    { name: 'fats', measure: 'g' },
    { name: 'proteins', measure: 'g' }
];

interface DashboardAnalyticsProps {
    entries: Entry[];
    user: User;
}

function summariseNutrientsOfEntries(entries: Entry[]) {
    return entries.reduce(
        (acc, entry) => {
            acc.calories += entry.calories || 0;
            acc.carbohydrates += entry.carbohydrates || 0;
            acc.fats += entry.fats || 0;
            acc.proteins += entry.proteins || 0;
            return acc;
        },
        { calories: 0, carbohydrates: 0, fats: 0, proteins: 0 }
    );
}

function getTargets(user: User) {
    return {
        calories: user.target_calories || 2000,
        carbohydrates: user.target_carbohydrates || 260,
        fats: user.target_fats || 70,
        proteins: user.target_proteins || 50,
    };
}

function analyseEntries(nutrientSummaryOfEntries: { calories: number, carbohydrates: number, fats: number, proteins: number}, targets: { calories: number, carbohydrates: number, fats: number, proteins: number }) {
    return nutrients.map((nutrient) => ({
        name: nutrient.name,
        measure: nutrient.measure,
        value: parseFloat(nutrientSummaryOfEntries[nutrient.name].toFixed(1)),
        target: targets[nutrient.name],
        percentage_completion: ((nutrientSummaryOfEntries[nutrient.name] / targets[nutrient.name]) * 100).toFixed(0)
    }));
}

export default function DashboardAnalytics({ entries, user }: DashboardAnalyticsProps) {
    // Summarise the nutrients of the entries
    const nutrientSummaryOfEntries = summariseNutrientsOfEntries(entries)

    // Get the user's targets
    const targets = getTargets(user);
    const targetsSet = user.target_calories && user.target_carbohydrates && user.target_fats && user.target_proteins;

    // Analyse the entries
    const analysis = analyseEntries(nutrientSummaryOfEntries, targets);

    return (
        <div className="w-full flex justify-between items-center">
            {targetsSet ? (
                // If the user has set targets, show the analysis
                <div className="flex flex-col space-y-4 w-full p-8">
                    {analysis.map((nutrient) => (
                        <div key={nutrient.name} className="w-full flex flex-col space-y-2">
                            <h3 className="text-sm font-medium capitalize flex justify-between text-gray-800">
                                <div>{nutrient.name}</div>
                                <div className="flex space-x-4">
                                    <div className="text-gray-400">
                                        <span className="text-gray-600">{nutrient.value}</span>
                                        {' / '}
                                        {nutrient.target}
                                        {nutrient.measure}
                                    </div>
                                    <div className="w-12 text-right">{nutrient.percentage_completion}%</div>
                                </div>
                            </h3>
                            <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                <div
                                    className="absolute left-0 top-0 h-2 bg-emerald-800 transition-all duration-1000 ease-in-out"
                                    style={{ width: `${nutrient.percentage_completion}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // If the user has not set targets, show a message and CTA to set targets
                <div className="text-gray-500 w-full flex justify-between items-center space-x-4 bg-gray-50 p-8">
                    <div>Set daily targets to see your progress.</div>
                    <Link href="/app/targets">
                        <button
                            type="button"
                            className="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            Set targets
                        </button>
                    </Link>
                </div>
            )}
        </div>
    );
}