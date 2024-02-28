"use client"
import { Events } from "src/components/calendar/Events"
import { localeDate, toCapitalize } from "src/utils/utils"
import {
  EventType,
  DailyEventColumProps,
  GetAll,
  RecordedEvent,
  ScheduledEvent,
  GetAllEvents,
  InsertScheduledEvent,
  InsertRecordedEvent,
} from "src/types"
import { useSelectedDateStore, useSelectedEventStore } from "src/stores/stores"
import { useMouse } from "react-use"
import { useRef } from "react"
import { addMinutes, setMinutes, setHours, startOfDay } from "date-fns"
import { NewEvent } from "src/components/calendar/NewEvent"
import { TypedEventRepository } from "src/utils/repositories/typedEventRepository"
import { recordedEvent, scheduledEvent } from "src/db/schema/schema"

export const DailyEventColumn: React.FC<DailyEventColumProps> = ({ date }) => {
  const selectedDate =
    date === undefined ? useSelectedDateStore((state) => state.selectedDate) : date
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)

  const types: EventType[] = ["scheduled", "recorded"]

  // const events: {
  //   scheduledEvents: Promise<InsertScheduledEvent[] | undefined>
  //   recordedEvents: Promise<InsertRecordedEvent[] | undefined>
  // } = {
  //   scheduledEvents: new TypedEventRepository<ScheduledEvent>(scheduledEvent).getAll(),
  //   recordedEvents: new TypedEventRepository<RecordedEvent>(recordedEvent).getAll(),
  // }

  const events = async () => ({
    scheduledEvents: await new TypedEventRepository<ScheduledEvent>(
      scheduledEvent,
    ).getAll(),
    recordedEvents: await new TypedEventRepository<RecordedEvent>(recordedEvent).getAll(),
  })

  // const events = async () => {
  //   scheduledEvents: await new TypedEventRepository<ScheduledEvent>(scheduledEvent).getAll(),
  //   recordedEvents: await new TypedEventRepository<RecordedEvent>(recordedEvent).getAll(),
  // }
  // const events = {
  //   scheduledEvents: {},
  //   recordedEvents: new TypedEventRepository<RecordedEvent>(recordedEvent).getAll(),
  // }
  // ;(async () => {
  //   events.scheduledEvents = await new TypedEventRepository<ScheduledEvent>(
  //     scheduledEvent,
  //   ).getAll()
  // })()
  const ref = useRef(null)

  const { elY, elH } = useMouse(ref)

  const getStartTime = (elY: number, elH: number) => {
    const coordinateInMinutes = Math.round((elY / elH) * 1440)

    // Round up to the nearest half hour
    // set -15 for an adjustment
    const roundedMinutes = Math.round((coordinateInMinutes - 15) / 30) * 30

    let startTime = startOfDay(selectedDate)
    startTime = setMinutes(
      setHours(startTime, Math.floor(roundedMinutes / 60)),
      roundedMinutes % 60,
    )

    return startTime
  }

  const handleNewEventClick = (type: EventType) => () => {
    setSelectedEvent({
      id: `new-${type}-${new Date().getTime()}`,
      title: `New ${toCapitalize(type)} Event`,
      type: type,
      startTime: getStartTime(elY, elH),
      endTime: addMinutes(getStartTime(elY, elH), 30),
      color: "",
    })
  }

  return (
    <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
      {types.map((type, index) => (
        <div
          ref={ref}
          key={index}
          className="relative flex w-[100px] flex-col justify-evenly overflow-hidden border-l border-slate-400"
          onClick={handleNewEventClick(type)}
        >
          <NewEvent date={selectedDate} type={type} />
          <Events date={selectedDate} events={events} type={type} />
        </div>
      ))}
    </div>
  )
}
