import { Props } from "src/types"
import { Calendar } from "src/components/calendar/Calendar"
import { Sidebar } from "src/components/Sidebar"

const CalendarLayout = async ({ children }: Props) => {
  return (
    <>
      <div className="grid lg:grid-cols-5">
        <Sidebar />
        <Calendar>{children}</Calendar>
      </div>
    </>
  )
}

export default CalendarLayout
