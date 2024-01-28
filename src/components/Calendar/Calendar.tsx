"use client"
import { useState } from "react"
import { CalendarView } from "src/types"
import { DailyView } from "src/components/calendar/day/DailyView"
import { WeeklyView } from "src/components/calendar/week/WeeklyView"
import { Tabs, TabsList, TabsTrigger } from "src/components/ui/tabs"
import { CalendarViewDropdown } from "src/components/calendar/CalendarViewDropdown"

export const Calendar: React.FC = () => {
  const [calendarView, setCalendarView] = useState<CalendarView>("daily")

  const handleViewChange = (newView: CalendarView) => {
    setCalendarView(newView)
  }

  const ViewSwitcherTab: React.FC = () => {
    return (
      <Tabs defaultValue="daily" className="w-[400px]">
        <TabsList>
          <TabsTrigger value="daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly">Weekly</TabsTrigger>
        </TabsList>
      </Tabs>
    )
  }

  return (
    <div className="h-screen w-full bg-pink-100">
      <CalendarViewDropdown value={calendarView} onValueChange={handleViewChange} />
      {calendarView === "daily" && <DailyView />}
      {calendarView === "weekly" && <WeeklyView />}
    </div>
  )
}
