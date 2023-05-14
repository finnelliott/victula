import { Entry } from "@prisma/client";

type nutrientType = {
    name: 'calories' | 'carbohydrates' | 'fats' | 'proteins',
    measure: string
}
const nutrients = [
    {
        name: 'calories',
        measure: 'kcal'
    },
    {
        name: 'carbohydrates',
        measure: 'g'
    },
    {
        name: 'fats',
        measure: 'g'
    },
    {
        name: 'proteins',
        measure: 'g'
    }
] as nutrientType[]

export default function ProgressChart({ entries, targets }: { entries: Entry[], targets: { calories: number, carbohydrates: number, fats: number, proteins: number }}) {
    const totalNutrients = entries.reduce(
        (acc, entry) => {
          acc.calories += entry.calories || 0;
          acc.carbohydrates += entry.carbohydrates || 0;
          acc.fats += entry.fats || 0;
          acc.proteins += entry.proteins || 0;
          return acc;
        },
        { calories: 0, carbohydrates: 0, fats: 0, proteins: 0 }
    );
    const data = nutrients.map((nutrient) => ({ name: nutrient.name, measure: nutrient.measure, value: totalNutrients[nutrient.name], target: targets[nutrient.name], percentage: ((totalNutrients[nutrient.name] / targets[nutrient.name]) * 100).toFixed(0) }))
    return (
        <div className="flex flex-col space-y-4 w-full p-8">
            {data.map((item) => (<div key={item.name} className="w-full flex flex-col space-y-2">
                <h3 className="text-sm font-medium capitalize flex justify-between text-gray-800"><div>{item.name}</div><div className="flex space-x-4"><div className="text-gray-400"><span className="text-gray-600">{item.value}</span>{` / `}{item.target}{item.measure}</div><div className="w-12 text-right">{item.percentage}%</div></div></h3>
                <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="absolute left-0 top-0 h-2 bg-emerald-800 transition-all duration-1000 ease-in-out" style={{width: `${item.percentage}%` }}/>                                
                </div>
            </div>))}
        </div>
    )
}