"use client"
import { DailyEventColumn } from "src/components/calendar/day/DailyEventColumn"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"

export const DailyView: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  return (
    <div>
      <div className="relative flex h-[1000px] w-screen flex-row bg-gray-50">
        <HourLabels />
        <DailyEventColumn date={selectedDate} />
      </div>
      <DateSwitcher />
    </div>
  )
}
