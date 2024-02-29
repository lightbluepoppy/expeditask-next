import { TimeType, EventProps, NewEventProps } from "src/types"
import { localeTime, localeDate, toCapitalize } from "src/libs/utils"
import { useSelectedEventStore } from "src/stores/stores"
import { startOfDay } from "date-fns"

export const NewEvent: React.FC<NewEventProps> = ({ date, type }) => {
  const targetDate = date.getDate()
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  if (!selectedEvent) return

  const eventComponentInfo = () => {
    const eventStartTime = new Date(selectedEvent.startTime)
    const eventEndTime = new Date(selectedEvent.endTime)
    const startTimeDate = eventStartTime.getDate()
    const endTimeDate = eventEndTime.getDate()
    const dateDifference = endTimeDate - startTimeDate

    // express Date object as maximum 1440 minutes and
    // calculate the ratio
    let top =
      ((eventStartTime.getHours() * 60 + eventStartTime.getMinutes()) / (60 * 24)) * 100
    let height =
      ((eventEndTime.getTime() - eventStartTime.getTime()) / (1000 * 60 * 60 * 24)) * 100 // milliseconds * seconds * minutes * hour
    let bottom =
      ((eventEndTime.getHours() * 60 + eventEndTime.getMinutes()) / (60 * 24)) * 100

    // clip bottom of the event component whose dates past midnight
    if (dateDifference >= 1) {
      height = height - (bottom + (dateDifference - 1) * 100)
    }

    // the event component that is in between the start and
    // end date, therefore spread across the top to bottom
    if (dateDifference >= 2 && targetDate > startTimeDate && endTimeDate > targetDate) {
      top = 0
      height = 100
    }

    // put the clipped event component at the top of
    // the end day
    if (date.getDate() === endTimeDate && startTimeDate < date.getDate()) {
      top = 0
      height = bottom
    }

    return { eventStartTime, eventEndTime, top, height }
  }

  const { eventStartTime, eventEndTime, top, height } = eventComponentInfo()

  if (
    selectedEvent.id.includes("new-") &&
    selectedEvent.type === type &&
    startOfDay(date).getTime() === startOfDay(eventStartTime).getTime()
  ) {
    return (
      <div
        key="new_event"
        className="absolute w-full pr-1"
        style={{
          top: `${top}%`,
          height: `${height}%`,
        }}
      >
        <div
          className={`outline-solid h-full cursor-pointer rounded-sm bg-blue-100 px-1 shadow-2xl transition-shadow duration-200 ease-in-out`}
        >
          <h3 className="text-sm font-bold text-gray-500">{selectedEvent.title}</h3>
        </div>
      </div>
    )
  }
}
