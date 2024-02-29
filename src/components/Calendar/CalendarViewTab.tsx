"use client"
import { MenuRadioGroupProps } from "@radix-ui/react-dropdown-menu"
import * as React from "react"
import { toCapitalize } from "src/libs/utils"
import { useRouter, usePathname } from "next/navigation"

import { Tabs, TabsList, TabsTrigger } from "src/components/ui/tabs"

export const CalendarViewTab: React.FC<MenuRadioGroupProps> = () => {
  const router = useRouter()
  const pathname = usePathname()
  const viewName = pathname.replace("/calendar/", "")
  const views = ["day", "week"]

  const handleClick = (view: string) => () => router.push(`/calendar/${view}`)

  return (
    <Tabs value={viewName}>
      <TabsList>
        {views.map((view, index) => (
          <TabsTrigger
            key={index}
            value={view}
            onClick={handleClick(view)}
            className="cursor-pointer"
          >
            {toCapitalize(view)}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
