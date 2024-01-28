"use client"
import { Events } from "src/components/calendar/Events"
import { HourGrid } from "src/components/calendar/HourGrid"
import { localeDate } from "src/utils/locale"
import { events } from "src/utils/sampleEvents"
import { EventType, DailyEventColumProps } from "src/types"

export const DailyEventColumn: React.FC<DailyEventColumProps> = ({
  date: selectedDate,
}) => {
  const types: EventType[] = ["scheduled", "recorded"]

  return (
    <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
      {types.map((type) => (
        <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
          <HourGrid />
          <Events date={selectedDate} events={events} type={type} />
        </div>
      ))}
    </div>
  )
}
