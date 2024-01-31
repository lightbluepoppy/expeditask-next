"use client"
import { MenuRadioGroupProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react"
import { useState } from "react"
import { toCapitalize } from "src/utils/utils"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"

import { Button } from "src/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "src/components/ui/dropdown-menu"

export const CalendarViewDropdown: React.FC<MenuRadioGroupProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const viewname = pathname.replace("/calendar/", "")

  const [calendarView, setCalendarView] = useState<string>(viewname)
  const views = ["day", "week"]

  const handleClick = (view: string) => () => router.push(`/calendar/${view}`)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">{toCapitalize(calendarView)}</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuRadioGroup value={calendarView} onValueChange={setCalendarView}>
          {views.map((view, index) => (
            <DropdownMenuRadioItem
              key={index}
              value={view}
              onClick={handleClick(view)}
              style={{ cursor: "pointer" }}
            >
              {toCapitalize(view)}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
