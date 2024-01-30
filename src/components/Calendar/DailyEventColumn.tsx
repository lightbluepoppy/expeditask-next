"use client"
import { Events } from "src/components/calendar/Events"
import { localeDate } from "src/utils/utils"
import { events } from "src/utils/sampleEvents"
import { EventType, DailyEventColumProps } from "src/types"
import { useSelectedDateStore } from "src/stores/stores"

export const DailyEventColumn: React.FC<DailyEventColumProps> = ({ date }) => {
  const selectedDate =
    date === undefined ? useSelectedDateStore((state) => state.selectedDate) : date
  const types: EventType[] = ["scheduled", "recorded"]

  return (
    <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
      {types.map((type, index) => (
        <div
          key={index}
          className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400"
        >
          <Events date={selectedDate} events={events} type={type} />
        </div>
      ))}
    </div>
  )
}
