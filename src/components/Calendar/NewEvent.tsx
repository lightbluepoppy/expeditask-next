"use client"
import { useEffect, useMemo, useRef, RefObject, createRef, forwardRef } from "react"
import { useClickAway } from "react-use"
import { TimeType, EventProps, NewEventProps } from "src/types"
import { localeTime, localeDate, toCapitalize } from "src/utils/utils"
import { CalendarEvent } from "src/types"
import { useSelectedEventStore } from "src/stores/stores"

export const NewEvent: React.FC<NewEventProps> = ({ date: selectedDate, type }) => {
  const targetDate = selectedDate.getDate()
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  if (!selectedEvent) return

  const eventComponentInfo = () => {
    const eventStartTime = new Date(selectedEvent.startTime)
    const eventEndTime = new Date(selectedEvent.endTime)
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
    if (
      selectedDate.getDate() === endTimeDate &&
      startTimeDate < selectedDate.getDate()
    ) {
      top = 0
      height = bottom
    }

    return { eventStartTime, eventEndTime, top, height }
  }

  const { eventStartTime, eventEndTime, top, height } = eventComponentInfo()

  // const ref = useRef<HTMLDivElement>(null)

  if (selectedEvent && selectedDate !== undefined && selectedEvent.type === type) {
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
          // ref={ref}
          className={`outline-solid h-full cursor-pointer rounded-sm bg-blue-100 p-2 shadow-2xl transition-shadow duration-200 ease-in-out`}
          // onClick={handleEventClick()}
        >
          <h3 className="text-sm font-bold">New {toCapitalize(type)} Event</h3>
          <p className="text-xs">{localeDate(eventStartTime)}</p>
          <p className="text-xs">{localeTime(eventStartTime)}</p>
          <p className="text-xs">{localeDate(eventEndTime)}</p>
          <p className="text-xs">{localeTime(eventEndTime)}</p>
        </div>
      </div>
    )
  }
}
