import { CalendarViewDropdown } from "src/components/calendar/CalendarViewDropdown"
import { Props } from "src/types"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"
import { EventEditor } from "src/components/calendar/EventEditor"
import { CalendarViewTab } from "src/components/calendar/CalendarViewTab"

export const Calendar: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-fit w-screen">
      <div className="flex justify-end gap-1">
        <DateSwitcher />
        <CalendarViewTab />
      </div>
      <div className="relative flex h-[1000px] flex-row">
        <HourLabels />
        <div className="flex h-full w-fit overflow-x-scroll">{children}</div>
        <EventEditor />
      </div>
    </div>
  )
}
