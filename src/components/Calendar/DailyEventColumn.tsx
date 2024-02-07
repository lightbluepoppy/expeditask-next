"use client"
import { Events } from "src/components/calendar/Events"
import { localeDate } from "src/utils/utils"
import { events } from "src/utils/sampleEvents"
import { EventType, DailyEventColumProps } from "src/types"
import { useSelectedDateStore } from "src/stores/stores"
import { useMouseHovered, useScratch } from "react-use"
import { useEffect, useRef, useState } from "react"

export const DailyEventColumn: React.FC<DailyEventColumProps> = ({ date }) => {
  const selectedDate =
    date === undefined ? useSelectedDateStore((state) => state.selectedDate) : date
  const types: EventType[] = ["scheduled", "recorded"]

  const ref = useRef(null)
  // const [ref, state] = useScratch()
  const { docX, docY, posX, posY, elX, elY, elW, elH } = useMouseHovered(ref, {
    bound: true,
  })
  const [newEvent, setNewEvent] = useState<number>()
  // useEffect(() => {
  // console.log(docY)
  // console.log(posY)
  // }, [posY])
  const handleNewEvent = () => {
    console.log(elY)
    setNewEvent(elY)
  }

  return (
    <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
      {types.map((type, index) => (
        <div
          ref={ref}
          key={index}
          className="relative flex w-[100px] flex-col justify-evenly overflow-hidden border-l border-slate-400"
          onMouseDown={handleNewEvent}
        >
          {newEvent !== undefined && (
            <div
              className="relative bg-red-600"
              style={{
                top: 0,
                width: 100,
                height: 100,
              }}
            ></div>
          )}
          <Events date={selectedDate} events={events} type={type} />
        </div>
      ))}
    </div>
  )
}
