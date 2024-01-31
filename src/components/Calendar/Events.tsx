"use client"
import { useEffect, useMemo, useRef, RefObject, createRef, forwardRef } from "react"
import { useClickAway } from "react-use"
import { TimeType, EventProps } from "src/types"
import { localeTime, localeDate } from "src/utils/utils"
import { CalendarEvent } from "src/types"
import { useSelectedEventStore } from "src/stores/stores"

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

  const selectedEventID = useSelectedEventStore((state) => state.selectedEventID)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  // const eventRefs = useRef<RefObject<HTMLDivElement>[]>(
  //   filteredEvents.map(() => createRef<HTMLInputElement>()),
  // )
  const eventRefs = filteredEvents.map(() => useRef<RefObject<HTMLDivElement>[]>())

  return filteredEvents.map((event, index) => {
    const { eventStartTime, eventEndTime, top, height } = useMemo(
      () => eventComponentInfo(event),
      [event],
    )

    // const ref = eventRefs[index]
    const ref = useRef<HTMLDivElement>(null)

    const eventComponentID = `${type === "scheduled" ? "skd" : "rec"}-${event.id}`

    // useClickAway(ref, () => {
    //   console.log("OUTSIDE CLICKED")
    //   setSelectedEvent("")
    // })

    // useClickAway(ref.current[index], () => {
    //   console.log("OUTSIDE CLICKED")
    //   setSelectedEvent("")
    // })

    // const ref = useClickAway(() => {
    //   console.log("OUTSIDE CLICKED")
    //   setSelectedEvent("")
    // })

    const handleEventClick = () => () => {
      // setSelectedEvent(selectedEventID === "" ? eventComponentID : "")
      setSelectedEvent(eventComponentID)
      console.log(eventComponentID)
    }

    // const handleClickOutside = (e) => {
    //   if (ref.current && !ref.current.contains(e.target as HTMLDivElement)) {
    //     setSelectedEvent("")
    //   }
    // }

    return (
      <div
        className="absolute w-full pr-1"
        style={{
          top: `${top}%`,
          height: `${height}%`,
        }}
      >
        <div
          key={eventComponentID}
          // ref={eventRefs.current[index]}
          ref={ref}
          className={`outline-solid h-full cursor-pointer overflow-hidden rounded bg-blue-100 p-2 ${eventComponentID === selectedEventID ? "shadow-xl" : "shadow-none"} transition-shadow duration-200 ease-in-out`}
          onClick={handleEventClick()}
          // onClick={(e) => handleClickOutside(e)}
        >
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
