"use client"
import { DailyEventColumn } from "./DailyEventColumn"
import { HourLabels } from "src/components/Calendar/HourLabels"
import { DateSwitcher } from "src/components/Calendar/DateSwitcher"
import { DateContextProvider } from "src/components/Calendar/DateContextProvider"

export const DailyView: React.FC = () => {
  return (
    <div>
      <div className="relative flex h-[1000px] w-screen flex-row bg-gray-50">
        <HourLabels />
        <DailyEventColumn />
      </div>
      <DateContextProvider>
        <DateSwitcher />
      </DateContextProvider>
    </div>
  )
}
