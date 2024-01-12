"use client"
import React from "react"

interface CalendarEvent {
    id: string
    title: string
    startTime: string // ISO string format
    endTime: string // ISO string format
}

// Sample events
const events: CalendarEvent[] = [
    {
        id: "test",
        title: "test",
        startTime: "2024-01-09T18:49:51+0000",
        endTime: "2024-01-09T21:49:51+0000",
    },
    {
        id: "test2",
        title: "test2",
        startTime: "2024-01-09T20:49:51+0000",
        endTime: "2024-01-09T21:49:51+0000",
    },
]

export const DailyEventColumn: React.FC = () => {
    const hour24Date = (time: string) => {
        return (
            <p>
                {new Date(time).toLocaleTimeString("en-US", {
                    hour12: false,
                })}
            </p>
        )
    }

    const renderEvent = () => {
        return events.map((event) => {
            const start = new Date(event.startTime)
            const end = new Date(event.endTime)

            const top = ((start.getHours() + start.getMinutes() / 60) * 100) / 24
            const height =
                (((end.getTime() - start.getTime()) / (1000 * 60 * 60)) * 100) / 24

            console.log(top)
            console.log(height)

            return (
                <div
                    key={event.id}
                    className="absolute p-2 bg-blue-100 rounded w-full"
                    style={{ top: `${top}%`, height: `${height}%` }}
                >
                    <h3 className="font-bold">{event.title}</h3>
                    {hour24Date(event.startTime)}
                    {hour24Date(event.endTime)}
                </div>
            )
        })
    }

    return (
        <div className="relative box-border border-x border-slate-500 w-[100px] px-1">
            {renderEvent()}
        </div>
    )
}
