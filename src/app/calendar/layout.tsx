import { Props } from "src/types"
import { Calendar } from "src/components/calendar/Calendar"
import { Sidebar } from "src/components/Sidebar"
import { getServerSession } from "next-auth"

import { getAllScheduledEvents, getAllRecordedEvents } from "src/libs/data"

const CalendarLayout = async ({ children }: Props) => {
  const session = await getServerSession()
  if (session === null) return

  const scheduledEvents = await getAllScheduledEvents()
  const recordedEvents = await getAllRecordedEvents()
  const events = [scheduledEvents!, recordedEvents!]

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
