"use client"
import { MenuRadioGroupProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react"
import { useState } from "react"
import { capitalize } from "src/utils/utils"
import Link from "next/link"

import { Button } from "src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"

export const CalendarViewDropdown: React.FC<MenuRadioGroupProps> = () => {
  const [calendarView, setCalendarView] = useState<string>("daily")

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{capitalize(calendarView!)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={calendarView} onValueChange={setCalendarView}>
          <DropdownMenuRadioItem value="daily">
            <Link href="/calendar/day">Daily</Link>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="weekly">
            <Link href="/calendar/week">Weekly</Link>
          </DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
