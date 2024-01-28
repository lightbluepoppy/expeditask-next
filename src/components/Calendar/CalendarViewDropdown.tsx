import * as React from "react"

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
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu"
import { CalendarView, CalendarViewDropdownProps } from "src/types"

const DropdownMenuRadioGroupOfCalendar = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Group>,
  // React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> & {
  //   value?: CalendarView
  //   onValueChange?: (value: CalendarView) => void
  // }
  React.ComponentPropsWithoutRef<typeof DropdownMenuPrimitive.Group> &
    CalendarViewDropdownProps
>(({ children, value, onValueChange, ...props }, ref) => (
  <DropdownMenuPrimitive.Group
    ref={ref}
    value={value}
    onValueChange={onValueChange}
    {...props}
  >
    {children}
  </DropdownMenuPrimitive.Group>
))

DropdownMenuRadioGroupOfCalendar.displayName = "DropdownMenuRadioGroupOfCalendar"

export const CalendarViewDropdown: React.FC<CalendarViewDropdownProps> = ({
  value,
  onValueChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Open</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Calendar view</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroupOfCalendar value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="daily">Daily</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="weekly">Weekly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroupOfCalendar>
        <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
          <DropdownMenuRadioItem value="daily">Daily</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="weekly">Weekly</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
