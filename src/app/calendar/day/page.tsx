// import { CalendarLayout } from "src/components/calendar/CalendarLayout"
import CalendarLayout from "src/app/calendar/layout"
import { DailyView } from "src/components/calendar/day/DailyView"
import { DailyEventColumn } from "src/components/calendar/day/DailyEventColumn"
import { useSelectedDateStore } from "src/stores/stores"

const DailyCalendar = async () => {
  return (
    <CalendarLayout>
      <DailyEventColumn />
    </CalendarLayout>
  )
}

export default DailyCalendar
