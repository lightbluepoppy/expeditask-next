"use client"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { localeTime } from "src/utils/localeTime"
import { Props, EventTypeProps } from "src/types"
import { events } from "src/utils/sampleEvents"
import { useState } from "react"

export const DailyEventColumn: React.FC = () => {
  const Events: React.FC<EventTypeProps> = ({ type }) => {
    const timeKey = type === "scheduled" ? "scheduled" : "recorded"

    return events.map((event) => {
      const start = new Date(event[`${timeKey}StartTime`])
      const end = new Date(event[`${timeKey}EndTime`])

      const top = ((start.getHours() * 60 + start.getMinutes()) / (24 * 60)) * 100
      let height = ((end.getTime() - start.getTime()) / (24 * 60 * 60 * 1000)) * 100 // hour * minutes * seconds * milliseconds

      const remainingDuration =
        ((end.getHours() * 60 + end.getMinutes()) / (24 * 60)) * 100

      if (end.getDay() !== start.getDay()) {
        height = height - remainingDuration
      }

      return (
        <div
          key={event.id}
          className="absolute w-full px-1"
          style={{ top: `${top}%`, height: `${height}%` }}
        >
          <div className="h-full rounded bg-blue-100 p-2">
            <h3 className="font-bold">{event.title}</h3>
            <p>{localeTime(new Date(event[`${timeKey}StartTime`]))}</p>
            <p>{localeTime(new Date(event[`${timeKey}EndTime`]))}</p>
          </div>
        </div>
      )
    })
  }

  const DailyEventColumnWrapper = ({ children }: Props) => {
    return (
      <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
        <HourGrid />
        {children}
      </div>
    )
  }

  const DailyColumn = ({ date: initialDate = new Date() }) => {
    const [date, setDate] = useState<Date>(initialDate)

    const handleDateChange = (newDate: Date) => setDate(newDate)

    return (
      <div className="flex" id={date.toString()}>
        <DailyEventColumnWrapper>
          <Events type="scheduled" />
        </DailyEventColumnWrapper>
        <DailyEventColumnWrapper>
          <Events type="recorded" />
        </DailyEventColumnWrapper>
      </div>
    )
  }
  return <DailyColumn />
}
