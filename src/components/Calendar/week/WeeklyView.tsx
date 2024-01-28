"use client"
import { WeeklyEventColumns } from "./WeeklyEventColumns"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"

export const WeeklyView: React.FC = () => {
  return (
    <div>
      <div className="relative flex h-[1000px] w-screen flex-row bg-gray-50">
        <HourLabels />
        <WeeklyEventColumns />
      </div>
      <DateSwitcher />
    </div>
  )
}
