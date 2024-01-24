"use client"
import { DailyEventColumn } from "./DailyEventColumn"
import { DailyEventRecordColumn } from "./DailyEventRecordColumn"
export const DailyView: React.FC = () => {
  const hours: number[] = Array.from({ length: 23 }, (_, i) => i + 1)

  // const concatZero = (hour: number) => (hour < 10 ? "0" + hour : hour.toString())

  return (
    <div className="relative flex h-[1000px] w-screen flex-row bg-gray-50">
      <div className="mx-1 my-2 flex flex-col justify-evenly">
        {hours.map((hour) => (
          <div key={hour} className="flex items-center justify-center text-xs font-light">
            <p>{hour < 10 ? "0" + hour : hour.toString()}:00</p>
          </div>
        ))}
      </div>
      <DailyEventColumn />
      {/* <DailyEventRecordColumn /> */}
    </div>
  )
}
