import { EventProps } from "src/types"
import { localeTime } from "src/utils/locale"

export const Events: React.FC<EventProps> = ({ events, type }) => {
  const timeKey = type === "scheduled" ? "scheduled" : "recorded"

  return events.map((event) => {
    const start = new Date(event[`${timeKey}StartTime`])
    const end = new Date(event[`${timeKey}EndTime`])

    const top = ((start.getHours() * 60 + start.getMinutes()) / (60 * 24)) * 100
    let height = ((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) * 100 // milliseconds * seconds * minutes * hour

    const remainingDuration = ((end.getHours() * 60 + end.getMinutes()) / (24 * 60)) * 100

    if (end.getDate() !== start.getDate()) {
      height = height - remainingDuration
    }

    return (
      <div
        key={event.id}
        className="absolute w-full px-1"
        style={{ top: `${top}%`, height: `${height}%` }}
      >
        <div className="h-full rounded bg-blue-100 p-2 shadow-md">
          <h3 className="font-bold">{event.title}</h3>
          <p>{localeTime(new Date(event[`${timeKey}StartTime`]))}</p>
          <p>{localeTime(new Date(event[`${timeKey}EndTime`]))}</p>
        </div>
      </div>
    )
  })
}
