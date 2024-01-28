"use client"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"
import { DailyEventColumn } from "../day/DailyEventColumn"

const getWeekDates = (inputDate: Date): Date[] => {
  const dayOfWeek = inputDate.getDay()

  const mondayDate = new Date(inputDate)
  mondayDate.setDate(inputDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

  const weekDates: Date[] = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(mondayDate)
    currentDate.setDate(mondayDate.getDate() + i)
    weekDates.push(currentDate)
  }

  return weekDates
}

export const WeeklyEventColumns: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const weekDates = getWeekDates(selectedDate)

  return weekDates.map((selectedDate) => <DailyEventColumn date={selectedDate} />)
}
