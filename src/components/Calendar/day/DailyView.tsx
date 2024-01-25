"use client"
import { DailyEventColumn } from "./DailyEventColumn"
import { HourLabels } from "src/components/Calendar/HourLabels"

export const DailyView: React.FC = () => {
  return (
    <div className="relative flex h-[1000px] w-screen flex-row bg-gray-50">
      <HourLabels />
      <DailyEventColumn />
    </div>
  )
}
