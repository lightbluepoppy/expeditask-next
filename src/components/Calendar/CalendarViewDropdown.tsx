"use client"
import { MenuRadioGroupProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react"
import { useState } from "react"
import { capitalize } from "src/utils/utils"
import Link from "next/link"
import { useRouter } from "next/navigation"

import { Button } from "src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"

export const CalendarViewDropdown: React.FC<MenuRadioGroupProps> = () => {
  const [calendarView, setCalendarView] = useState<string>("day")
  const views = ["day", "week"]
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{capitalize(calendarView!)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={calendarView} onValueChange={setCalendarView}>
          {views.map((view, index) => (
            <DropdownMenuRadioItem
              key={index}
              value={view}
              onClick={() => router.push(`/calendar/${view}`)}
              style={{ cursor: "pointer" }}
            >
              {capitalize(view)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
