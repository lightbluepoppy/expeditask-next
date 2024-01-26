import { EventProps } from "src/types"
import { localeTime, localeDate } from "src/utils/locale"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"

export const Events: React.FC<EventProps> = ({ events, type }) => {
  const timeKey = type === "scheduled" ? "scheduled" : "recorded"

  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const targetDate = selectedDate.getDate()

  const filteredEvents = events.filter((event) => {
    const eventStartDate = new Date(event.scheduledStartTime).getDate()
    const eventEndDate = new Date(event.scheduledEndTime).getDate()

    return (
      eventStartDate === targetDate ||
      (eventStartDate < targetDate && eventEndDate === targetDate) ||
      (eventStartDate < targetDate && eventEndDate > targetDate)
    )
  })

  return filteredEvents.map((event) => {
    const startTime = new Date(event[`${timeKey}StartTime`])
    const endTime = new Date(event[`${timeKey}EndTime`])

    // express Date object as maximum 1440 minutes and
    // calculate the ratio
    let top = ((startTime.getHours() * 60 + startTime.getMinutes()) / (60 * 24)) * 100
    let height = ((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60 * 24)) * 100 // milliseconds * seconds * minutes * hour
    const bottom = ((endTime.getHours() * 60 + endTime.getMinutes()) / (60 * 24)) * 100

    const timeDifference = endTime.getDate() - startTime.getDate()

    // clip bottom of the events whose dates past midnight
    // that last across more than two days
    if (timeDifference >= 1) {
      height = height - bottom - (timeDifference - 1) * 100
    }

    // events that last for more than two days
    // must be spread from the top to bottom
    // it is between start and end
    if (
      timeDifference > 1 &&
      startTime.getDate() < targetDate &&
      endTime.getDate() > targetDate
    ) {
      top = 0
      height = 100
    }

    // put the clipped events at the top of the next day
    if (
      endTime.getDate() === selectedDate.getDate() &&
      startTime.getDate() < selectedDate.getDate()
    ) {
      top = 0
      height = bottom
    }

    return (
      <div
        key={event.id}
        className="absolute w-full px-1"
        style={{ top: `${top}%`, height: `${height}%` }}
      >
        <div className="h-full overflow-hidden rounded bg-blue-100 p-2 shadow-md">
          <h3 className="text-sm font-bold">{event.title}</h3>
          <p className="text-xs">{localeDate(startTime)}</p>
          <p className="text-xs">{localeTime(startTime)}</p>
          <p className="text-xs">{localeDate(endTime)}</p>
          <p className="text-xs">{localeTime(endTime)}</p>
        </div>
      </div>
    )
  })
}
