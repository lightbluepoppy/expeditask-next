"use client"
import { Events } from "src/components/Calendar/Events"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { localeDate } from "src/utils/locale"
import { events } from "src/utils/sampleEvents"
import { EventType, DailyEventColumProp } from "src/types"

export const DailyEventColumn: React.FC<DailyEventColumProp> = ({
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
