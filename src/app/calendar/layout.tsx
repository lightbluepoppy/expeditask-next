"use client"
import { CalendarViewDropdown } from "src/components/calendar/CalendarViewDropdown"
import { CalendarChildrenProps } from "src/types"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"

const CalendarLayout: React.FC<CalendarChildrenProps> = ({ children }) => {
  return (
    <div className="h-fit w-full bg-pink-100">
      <CalendarViewDropdown />
      <div className="relative flex h-[1000px] w-screen flex-row">
        <HourLabels />
        {children}
      </div>
      <DateSwitcher />
    </div>
  )
}

export default CalendarLayout
