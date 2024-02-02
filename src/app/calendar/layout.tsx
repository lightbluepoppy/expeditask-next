import { Props } from "src/types"
import { Calendar } from "src/components/calendar/Calendar"
const CalendarLayout = async ({ children }: Props) => {
  return (
    <>
      <Calendar>{children}</Calendar>
    </>
  )
}

export default CalendarLayout
