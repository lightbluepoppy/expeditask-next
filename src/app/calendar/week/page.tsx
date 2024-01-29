// import { CalendarLayout } from "src/components/calendar/CalendarLayout"
import CalendarLayout from "src/app/calendar/layout"
import { WeeklyEventColumns } from "src/components/calendar/week/WeeklyEventColumns"

const WeeklyCalendar = async () => {
  return (
    <CalendarLayout>
      <WeeklyEventColumns />
    </CalendarLayout>
  )
}

export default WeeklyCalendar
