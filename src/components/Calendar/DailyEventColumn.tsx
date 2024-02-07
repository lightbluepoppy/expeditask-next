"use client"
import { Events } from "src/components/calendar/Events"
import { localeDate } from "src/utils/utils"
import { events } from "src/utils/sampleEvents"
import { EventType, DailyEventColumProps } from "src/types"
import { useSelectedDateStore, useSelectedEventStore } from "src/stores/stores"
import { useMouseHovered, useScratch } from "react-use"
import { useEffect, useRef, useState } from "react"
import { addHours, addMinutes, setMinutes, setHours, startOfDay } from "date-fns"
import { NewEvent } from "./NewEvent"

export const DailyEventColumn: React.FC<DailyEventColumProps> = ({ date }) => {
  const selectedDate =
    date === undefined ? useSelectedDateStore((state) => state.selectedDate) : date
  const types: EventType[] = ["scheduled", "recorded"]
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  const [visible, setVisible] = useState(false)

  const ref = useRef(null)

  const { elY, elH } = useMouseHovered(ref, {
    bound: true,
  })

  const getStartTime = (elY: number, elH: number) => {
    const coordinateInMinutes = Math.round((elY / elH) * 1440)
    let startTime = startOfDay(selectedDate)

    // Round up to the nearest half hour
    const roundedMinutes = Math.round((coordinateInMinutes - 15) / 30) * 30

    startTime = setMinutes(
      setHours(startTime, Math.floor(roundedMinutes / 60)),
      roundedMinutes % 60,
    )

    return startTime
  }

  const handleNewEvent = (type: EventType) => () => {
    setSelectedEvent({
      title: "New Event",
      id: "new_event",
      type: type,
      startTime: getStartTime(elY, elH).toISOString(),
      endTime: addHours(getStartTime(elY, elH), 2).toISOString(),
    })
    setVisible(true)
    if (!selectedEvent) return
    console.log(startOfDay(selectedDate).toISOString())
    console.log(startOfDay(selectedEvent.startTime).toISOString())
  }

  return (
    <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
      {types.map((type, index) => (
        <div
          ref={ref}
          key={index}
          className="relative flex w-[100px] flex-col justify-evenly overflow-hidden border-l border-slate-400"
          onClick={handleNewEvent(type)}
        >
          {/* {selectedEvent && selectedDate !== undefined && selectedEvent.type === type && ( */}
          {/*   <NewEvent date={selectedDate} type={type} /> */}
          {/* )} */}
          <NewEvent date={selectedDate} type={type} visible={visible} />
          <Events date={selectedDate} events={events} type={type} />
        </div>
      ))}
    </div>
  )
}
