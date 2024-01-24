"use client"
import React from "react"

interface CalendarEvent {
  id: string
  title: string
  scheduledStartTime: string // ISO string format
  scheduledEndTime: string // ISO string format
  recordedStartTime: string // ISO string format
  recordedEndTime: string // ISO string format
}

interface EventTypeProps {
  type: "scheduled" | "recorded"
}

// Sample events
const events: CalendarEvent[] = [
  {
    id: "test1",
    title: "test1",
    scheduledStartTime: "2024-01-09T08:50:00+0000",
    scheduledEndTime: "2024-01-09T11:30:00+0000",
    recordedStartTime: "2024-01-09T08:32:00+0000",
    recordedEndTime: "2024-01-09T11:20:00+0000",
  },
  {
    id: "test2",
    title: "test2",
    scheduledStartTime: "2024-01-09T14:50:00+0000",
    scheduledEndTime: "2024-01-09T17:00:00+0000",
    recordedStartTime: "2024-01-09T13:15:00+0000",
    recordedEndTime: "2024-01-09T16:30:00+0000",
  },
  {
    id: "test3",
    title: "test3",
    scheduledStartTime: "2024-01-09T20:00:00+0000",
    scheduledEndTime: "2024-01-10T02:49:51+0000",
    recordedStartTime: "2024-01-09T22:49:51+0000",
    recordedEndTime: "2024-01-10T02:50:00+0000",
  },
]

const HourlyGrid: React.FC = () => {
  const hours: number[] = Array.from({ length: 23 }, (_, i) => i + 1)
  return (
    <>
      {hours.map((hour) => (
        <div key={hour} className="h-100 w-full border-t border-slate-400"></div>
      ))}
    </>
  )
}

const DailyEventColumnDiv: React.FC<Props> = ({ children }) => {
  return (
    <div className="relative flex w-[200px] flex-col justify-evenly border-x border-slate-500">
      <HourlyGrid />
      {children}
    </div>
  )
}

export const DailyEventColumn: React.FC = () => {
  const hour24Date = (time: string) => {
    return new Date(time).toLocaleTimeString("en-US", {
      hour12: false,
    })
  }

  //   const ScheduledEvents: React.FC = () => {
  //     return events.map((event) => {
  //       const start = new Date(event.scheduledStartTime)
  //       const end = new Date(event.scheduledEndTime)

  //       const top = ((start.getHours() + start.getMinutes() / 60) * 100) / 24
  //       const height = (((end.getTime() - start.getTime()) / (1000 * 60 * 60)) * 100) / 24

  //       console.log(top)
  //       console.log(height)

  //       return (
  //         <div
  //           key={event.id}
  //           className="absolute w-full px-1"
  //           style={{ top: `${top}%`, height: `${height}%` }}
  //         >
  //           <div className="h-full rounded bg-blue-100 p-2">
  //             <h3 className="font-bold">{event.title}</h3>
  //             <p>{hour24Date(event.scheduledStartTime)}</p>
  //             <p>{hour24Date(event.scheduledEndTime)}</p>
  //           </div>
  //         </div>
  //       )
  //     })
  //   }

  // const RecordedEvents: React.FC = () => {
  //   return events.map((event) => {
  //     const start = new Date(event.recordedStartTime)
  //     const end = new Date(event.recordedEndTime)

  //     const top = ((start.getHours() + start.getMinutes() / 60) * 100) / 24
  //     const height = (((end.getTime() - start.getTime()) / (1000 * 60 * 60)) * 100) / 24

  //     console.log(top)
  //     console.log(height)

  //     return (
  //       <div
  //         key={event.id}
  //         className="absolute w-full px-1"
  //         style={{ top: `${top}%`, height: `${height}%` }}
  //       >
  //         <div className="h-full rounded bg-blue-100 p-2">
  //           <h3 className="font-bold">{event.title}</h3>
  //           <p>{hour24Date(event.recordedStartTime)}</p>
  //           <p>{hour24Date(event.recordedEndTime)}</p>
  //         </div>
  //       </div>
  //     )
  //   })
  // }

  const Events: React.FC<EventTypeProps> = ({ type }) => {
    const timeKey = type === "scheduled" ? "scheduled" : "recorded"

    return events.map((event) => {
      const start = new Date(event[`${timeKey}StartTime`])
      const end = new Date(event[`${timeKey}EndTime`])

      const top = ((start.getHours() + start.getMinutes() / 60) * 100) / 24
      const height = (((end.getTime() - start.getTime()) / (1000 * 60 * 60)) * 100) / 24

      console.log(top)
      console.log(height)

      return (
        <div
          key={event.id}
          className="absolute w-full px-1"
          style={{ top: `${top}%`, height: `${height}%` }}
        >
          <div className="h-full rounded bg-blue-100 p-2">
            <h3 className="font-bold">{event.title}</h3>
            <p>{hour24Date(event[`${timeKey}StartTime`])}</p>
            <p>{hour24Date(event[`${timeKey}EndTime`])}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <DailyEventColumnDiv>
        <Events type="scheduled" />
      </DailyEventColumnDiv>
      <DailyEventColumnDiv>
        <Events type="recorded" />
      </DailyEventColumnDiv>
    </>
  )
}
