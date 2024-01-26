"use client"
import { useState } from "react"
import { Events } from "src/components/Calendar/Events"
import { HourGrid } from "src/components/Calendar/HourGrid"
import { localeDate } from "src/utils/locale"
import { events } from "src/utils/sampleEvents"
import { Props, EventType } from "src/types"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"

export const DailyEventColumn: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)

  const DailyEventColumnWrapper: React.FC<Props> = ({ children }) => {
    return (
      <div className="relative flex w-[100px] flex-col justify-evenly border-l border-slate-400">
        <HourGrid />
        {children}
      </div>
    )
  }

  const DailyColumn = () => {
    const types: EventType[] = ["scheduled", "recorded"]

    return (
      <div className="flex" id={localeDate(selectedDate)} key={localeDate(selectedDate)}>
        {types.map((type) => (
          <DailyEventColumnWrapper key={type}>
            <Events events={events} type={type} />
          </DailyEventColumnWrapper>
        ))}
      </div>
    )
  }
  return <DailyColumn />
}
