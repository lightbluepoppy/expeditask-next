import { useMemo } from "react"
import { TimeType, EventProps } from "src/types"
import { localeTime, localeDate } from "src/utils/locale"
import { CalendarEvent } from "src/types"

export const Events: React.FC<EventProps> = ({ date: selectedDate, events, type }) => {
  const eventKey = type === "scheduled" ? "scheduled" : "recorded"
  const eventProperty = (timeType: TimeType) =>
    (timeType === "start"
      ? `${eventKey}StartTime`
      : `${eventKey}EndTime`) as keyof CalendarEvent

  const targetDate = selectedDate.getDate()

  const filteredEvents = events.filter((event) => {
    const eventStartDate = new Date(event[eventProperty("start")]).getDate()
    const eventEndDate = new Date(event[eventProperty("end")]).getDate()

    const isOneDayEventComponent =
      targetDate === eventStartDate && targetDate === eventEndDate
    const isMultipleDayEventFirstComponent =
      targetDate === eventStartDate && targetDate < eventEndDate
    const isMultipleDayEventMiddleComponent =
      targetDate > eventStartDate && targetDate < eventEndDate
    const isMultipleDayEventLastComponent =
      targetDate > eventStartDate && targetDate === eventEndDate

    return (
      isOneDayEventComponent ||
      isMultipleDayEventFirstComponent ||
      isMultipleDayEventMiddleComponent ||
      isMultipleDayEventLastComponent
    )
  })

  const eventComponentInfo = (event: CalendarEvent) => {
    const eventStartTime = new Date(event[eventProperty("start")])
    const eventEndTime = new Date(event[eventProperty("end")])
    const startTimeDate = eventStartTime.getDate()
    const endTimeDate = eventEndTime.getDate()

    // express Date object as maximum 1440 minutes and
    // calculate the ratio
    let top =
      ((eventStartTime.getHours() * 60 + eventStartTime.getMinutes()) / (60 * 24)) * 100
    let height =
      ((eventEndTime.getTime() - eventStartTime.getTime()) / (1000 * 60 * 60 * 24)) * 100 // milliseconds * seconds * minutes * hour
    let bottom =
      ((eventEndTime.getHours() * 60 + eventEndTime.getMinutes()) / (60 * 24)) * 100

    const dateDifference = endTimeDate - startTimeDate

    // clip bottom of the event component whose dates past midnight
    // that last for more than two days
    if (dateDifference >= 1) {
      height = height - (bottom + (dateDifference - 1) * 100)
    }

    // the event component that is in between the start and
    // end date, therefore spread across the top to bottom
    if (dateDifference > 1 && targetDate > startTimeDate && endTimeDate > targetDate) {
      top = 0
      height = 100
    }

    // put the clipped event component at the top of
    // the end day
    if (
      selectedDate.getDate() === endTimeDate &&
      startTimeDate < selectedDate.getDate()
    ) {
      top = 0
      height = bottom
    }

    return { eventStartTime, eventEndTime, top, height }
  }

  return filteredEvents.map((event) => {
    const { eventStartTime, eventEndTime, top, height } = useMemo(
      () => eventComponentInfo(event),
      [events],
    )

    return (
      <div
        key={event.id}
        className="absolute w-full pr-1"
        style={{ top: `${top}%`, height: `${height}%` }}
      >
        <div className="outline-solid h-full overflow-hidden rounded border-[1px] border-white bg-blue-100 p-2">
          <h3 className="text-sm font-bold">{event.title}</h3>
          <p className="text-xs">{localeDate(eventStartTime)}</p>
          <p className="text-xs">{localeTime(eventStartTime)}</p>
          <p className="text-xs">{localeDate(eventEndTime)}</p>
          <p className="text-xs">{localeTime(eventEndTime)}</p>
        </div>
      </div>
    )
  })
}
