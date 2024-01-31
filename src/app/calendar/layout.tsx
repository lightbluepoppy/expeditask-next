import { Props } from "src/types"
import { Calendar } from "src/components/calendar/Calendar"

const CalendarLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <Calendar>{children}</Calendar>
    </>
  )
}

export default CalendarLayout
