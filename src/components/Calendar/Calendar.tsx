import { Props } from "src/types"
import { HourLabels } from "src/components/calendar/HourLabels"
import { DateSwitcher } from "src/components/calendar/DateSwitcher"
import { CalendarViewTab } from "src/components/calendar/CalendarViewTab"
import { EventSideEditor } from "./EventSideEditor"

const CalendarHeader = () => (
  <div className="fixed right-0 z-10 flex w-screen justify-end gap-1 bg-white">
    <DateSwitcher />
    <CalendarViewTab />
  </div>
)

const CalendarContent: React.FC<Props> = ({ children }) => (
  <div className="relative top-10 flex h-[1000px] flex-row overscroll-none">
    <HourLabels />
    <div className="flex h-full w-fit">{children}</div>
  </div>
)

export const Calendar: React.FC<Props> = ({ children }) => {
  return (
    <div className="h-fit w-screen">
      <CalendarHeader />
      <CalendarContent>{children}</CalendarContent>
      <EventSideEditor />
    </div>
  )
}
