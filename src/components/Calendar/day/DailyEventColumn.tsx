"use client"
import { useContext, useState } from "react"
import { Events } from "src/components/Calendar/Events"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { DateContext } from "src/components/Calendar/DateContextProvider"
import { localeDate } from "src/utils/locale"
import { events } from "src/utils/sampleEvents"
import { Props, EventType } from "src/types"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"

export const DailyEventColumn: React.FC = () => {
  // const { selectedDate } = useContext(DateContext)

  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  // const setSelectedDateToToday = useSelectedDateStore(
  //   (state) => state.setSelectedDateToToday,
  // )
  // const changeSelectedDate = useSelectedDateStore((state) => state.changeSelectedDate)

  const filteredEvents = events.filter((event) => {
    const targetDate = selectedDate.getDate()
    // const targetDate = new Date("2024-01-09").getDay()
    const eventStartDate = new Date(event.scheduledStartTime).getDate()
    const eventEndDate = new Date(event.scheduledEndTime).getDate()

    return eventStartDate === targetDate && eventEndDate - eventStartDate <= 1
  })

  const DailyEventColumnWrapper: React.FC<Props> = ({ children }) => {
    return (
      <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
        <HourGrid />
        {children}
      </div>
    )
  }

  const DailyColumn = ({ date: initialDate = new Date() }) => {
    const types: EventType[] = ["scheduled", "recorded"]
    const [date, setDate] = useState<Date>(initialDate)

    const handleDateChange = (newDate: Date) => setDate(newDate)

    return (
      <div className="flex" id={localeDate(date)} key={localeDate(date)}>
        {types.map((type) => (
          <DailyEventColumnWrapper key={type}>
            <Events events={filteredEvents} type={type} />
          </DailyEventColumnWrapper>
        ))}
      </div>
    )
  }
  return <DailyColumn />
}
