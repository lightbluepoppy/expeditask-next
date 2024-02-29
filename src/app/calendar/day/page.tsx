import { DailyEventColumn } from "src/components/calendar/DailyEventColumn"
import { getAllScheduledEvents, getAllRecordedEvents } from "src/libs/data"

const DailyCalendar = async () => {
  return (
    <>
      <DailyEventColumn />
    </>
  )
}

export default DailyCalendar
