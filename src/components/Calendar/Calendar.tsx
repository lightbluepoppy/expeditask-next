import { Props } from "src/types"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"
import { CalendarViewTab } from "src/components/calendar/CalendarViewTab"
import { EventSideEditor } from "./EventSideEditor"

export const Calendar: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-fit w-screen">
      <div className="fixed z-10 flex w-screen justify-end gap-1 bg-white">
        <DateSwitcher />
        <CalendarViewTab />
      </div>
      <div className="relative top-10 flex h-[1000px] flex-row">
        <HourLabels />
        <div className="flex h-full w-fit overflow-x-scroll">{children}</div>
        <EventSideEditor />
      </div>
    </div>
  )
}
