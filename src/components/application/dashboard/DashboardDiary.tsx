import DashboardDiaryEntryDropdown from "./DashboardDiaryEntryDropdown"
import { Entry } from "@prisma/client"

export default function DashboardDiary({ entries, date } : { entries: Entry[], date: Date }) {
    const hasEntries = entries && entries.length > 0

    if (hasEntries) {
        return (
            // If there are entries, render them
            <div className="flex flex-col h-full w-full divide-y divide-gray-300">
                {entries.map((entry) => (
                    <div key={entry.id} className="w-full p-8 flex space-x-4 justify-between items-center">
                        <div className="flex-1 w-5/6">
                            <h3 className="font-medium text-lg text-gray-800">{entry.name}</h3>
                            <div className="flex space-x-4 text-xs text-gray-500 mt-2">
                                <div><span className="text-gray-400">Energy </span>{entry.calories}kcal</div>
                                <div><span className="text-gray-400">Protein </span>{entry.proteins}g</div>
                                <div><span className="text-gray-400">Carbs </span>{entry.carbohydrates}g</div>
                                <div><span className="text-gray-400">Fat </span>{entry.fats}g</div>
                            </div>
                            {entry.description && <div className="max-w-full"><p className="text-gray-600 text-xs mt-2 truncate leading-5 h-5">{entry.description}</p></div>}
                        </div>
                        <DashboardDiaryEntryDropdown entry={entry} />
                    </div>
                ))}
            </div>
        )
    } else {
        return (
            // If there are no entries, render a message
            <div className="p-8 text-gray-500 text-left flex items-center justify-between">
                <div className="flex-1 min-w-0">
                    No entries for {new Date(date).toDateString()}. Add items you&apos;ve eaten to your diary to see them appear&nbsp;here.
                </div>
            </div>
        )
    }
}