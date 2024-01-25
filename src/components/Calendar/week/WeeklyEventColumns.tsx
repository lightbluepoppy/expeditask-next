"use client"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { localeTime, localeDate } from "src/utils/locale"
import { Props, EventTypeProps } from "src/types"
import { events } from "src/utils/sampleEvents"
import { useState } from "react"

const getWeekDates = (inputDate: Date): Date[] => {
  // 入力された日付の曜日を取得 (0: 日曜日, 1: 月曜日, ..., 6: 土曜日)
  const dayOfWeek = inputDate.getDay()

  // 月曜日から開始するため、入力日から曜日分引く
  const mondayDate = new Date(inputDate)
  mondayDate.setDate(inputDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

  // 週の日付を格納する配列を初期化
  const weekDates: Date[] = []

  // 月曜日から日曜日までの日付を配列に追加
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(mondayDate)
    currentDate.setDate(mondayDate.getDate() + i)
    weekDates.push(currentDate)
  }

  return weekDates
}

export const WeeklyEventColumns: React.FC = () => {
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

  const ScheduledTimeline = () => {}

  const DailyEventColumnWrapper = ({ children }: Props) => {
    return (
      <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
        <HourGrid />
        {children}
      </div>
    )
  }

  const WeeklyDateArray = ({ startDate: initialStartDate = new Date() }) => {
    const [startDate, setStartDate] = useState<Date>(initialStartDate)
    const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(startDate))

    const handleDateChange = (newDate: Date) => {
      setStartDate(newDate)
      setWeekDates(getWeekDates(newDate))
    }

    return weekDates.map((date, index) => (
      <div className="flex" key={index} id={localeDate(date)}>
        <DailyEventColumnWrapper>
          <Events type="scheduled" />
        </DailyEventColumnWrapper>
        <DailyEventColumnWrapper>
          <Events type="recorded" />
        </DailyEventColumnWrapper>
      </div>
    ))
  }

  return <WeeklyDateArray />
}
