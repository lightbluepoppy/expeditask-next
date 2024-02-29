"use client"
import { useEffect, useMemo, useRef, RefObject, createRef, forwardRef } from "react"
import { useClickAway } from "react-use"
import { EventProps, SelectRecordedEvent, SelectScheduledEvent } from "src/types"
import { localeTime, localeDate } from "src/libs/utils"
import { useSelectedEventStore } from "src/stores/stores"

export const Events: React.FC<EventProps> = ({ date, events, type }) => {
  const targetDate = date.getDate()

  const filteredEvents = events?.filter((event) => {
    const eventStartDate = event.startTime.getDate()
    const eventEndDate = event.endTime.getDate()

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

  const eventComponentInfo = (event: SelectScheduledEvent | SelectRecordedEvent) => {
    const eventStartTime = event.startTime
    const eventEndTime = event.endTime
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

    return { top, height }
  }

  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  return filteredEvents?.map((event) => {
    const { top, height } = useMemo(() => eventComponentInfo(event), [event])

    const id = selectedEvent?.id

    const ref = useRef<HTMLDivElement>(null)

    const eventComponentId = `${type === "scheduled" ? "skd" : "rec"}-${event.id}`

    const handleEventClick = (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation()
      setSelectedEvent({
        id: eventComponentId,
        title: event.title,
        type: type,
        startTime: event.startTime,
        endTime: event.endTime,
      })
    }

    return (
      <div
        key={eventComponentId}
        className="absolute w-full pr-1"
        style={{
          top: `${top}%`,
          height: `${height}%`,
        }}
      >
        <div
          ref={ref}
          className={`outline-solid h-full cursor-pointer rounded-sm bg-blue-100 p-2 ${eventComponentId === id ? "shadow-2xl" : "shadow-none"} transition-shadow duration-200 ease-in-out`}
          onClick={(e) => handleEventClick(e)}
        >
          <h3 className="text-sm font-bold">{event.title}</h3>
          <p className="text-xs">{localeDate(event.startTime)}</p>
          <p className="text-xs">{localeTime(event.startTime)}</p>
          <p className="text-xs">{localeDate(event.endTime)}</p>
          <p className="text-xs">{localeTime(event.endTime)}</p>
        </div>
      </div>
    )
  })
}
