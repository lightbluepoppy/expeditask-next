"use client"
import { useSelectedDateStore } from "src/stores/stores"
import { DailyEventColumn } from "src/components/calendar/DailyEventColumn"
import { getWeekDates } from "src/libs/utils"

export const WeeklyEventColumns: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const weekDates = getWeekDates(selectedDate)

  return weekDates.map((selectedDate, index) => (
    <DailyEventColumn key={index} date={selectedDate} />
  ))
}
