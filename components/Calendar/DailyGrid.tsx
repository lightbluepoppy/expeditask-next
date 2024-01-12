"use client"
import { DailyEventColumn } from "./DailyEventColumn"
export const DailyGrid: React.FC = () => {
    const hours: number[] = Array.from({ length: 24 }, (_, i) => i)
    return (
        <div className="relative flex flex-row bg-gray-50 h-[1000px]">
            <div className="flex flex-col justify-evenly">
                {hours.map((hour) => (
                    <div
                        key={hour}
                        className="text-xs font-light flex items-center justify-center"
                    >
                        {hour}:00
                    </div>
                ))}
            </div>
            <div className="absolute flex flex-col justify-evenly">
                {hours.map((hour) => (
                    <div key={hour} className="w-[600px] border-b-slate-100"></div>
                ))}
            </div>
            <DailyEventColumn />
        </div>
    )
}
