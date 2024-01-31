"use client"
import { CalendarViewDropdown } from "src/components/calendar/CalendarViewDropdown"
import { Props } from "src/types"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"
import { EventEditor } from "./EventEditor"

export const Calendar: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-fit w-full">
      <CalendarViewDropdown />
      <div className="relative flex h-[1000px] w-screen flex-row">
        <HourLabels />
        {children}
        <EventEditor />
      </div>
      <DateSwitcher />
    </div>
  )
}
