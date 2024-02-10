import { Props } from "src/types"
import { Calendar } from "src/components/calendar/Calendar"
import { Sidebar } from "src/components/Sidebar"
import { getServerSession } from "next-auth"
const CalendarLayout = async ({ children }: Props) => {
  const session = await getServerSession()
  if (session === null) return
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
