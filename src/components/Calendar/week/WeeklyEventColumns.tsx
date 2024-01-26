"use client"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { localeDate } from "src/utils/locale"
import { Props, EventType } from "src/types"
import { Events } from "src/components/Calendar/Events"
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
  const DailyEventColumnWrapper = ({ children }: Props) => {
    return (
      <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
        <HourGrid />
        {children}
      </div>
    )
  }

  const WeeklyColumn = ({ startDate: initialStartDate = new Date() }) => {
    const types: EventType[] = ["scheduled", "recorded"]
    const [startDate, setStartDate] = useState<Date>(initialStartDate)
    const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(startDate))

    const handleDateChange = (newDate: Date) => {
      setStartDate(newDate)
      setWeekDates(getWeekDates(newDate))
    }

    return weekDates.map((date, index) => (
      <div className="flex" id={localeDate(date)} key={index}>
        {types.map((type) => (
          <DailyEventColumnWrapper key={type}>
            <Events events={events} type={type} />
          </DailyEventColumnWrapper>
        ))}
      </div>
    ))
  }

  return <WeeklyColumn />
}
