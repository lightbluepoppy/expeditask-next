"use client"

import React, { useMemo } from "react"
import dayjs from "dayjs"
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar"
import events from "src/components/resources/demo/events"
import "react-big-calendar/lib/css/react-big-calendar.css"
import "react-big-calendar/lib/addons/dragAndDrop/styles.css"

// Note that the dayjsLocalizer extends Day.js with the following plugins:
// - IsBetween
// - IsSameOrAfter
// - IsSameOrBefore
// - LocaleData
// - LocalizedFormat
// - MinMax
// - UTC

// add optional time zone support
import timezone from "dayjs/plugin/timezone"
dayjs.extend(timezone)

const djLocalizer = dayjsLocalizer(dayjs)

const ColoredDateCellWrapper = ({ children }) =>
  React.cloneElement(React.Children.only(children), {
    style: {
      backgroundColor: "lightblue",
    },
  })

export function Dayjs({ ...props }) {
  const { components, defaultDate, max, views } = useMemo(
    () => ({
      components: {
        timeSlotWrapper: ColoredDateCellWrapper,
      },
      defaultDate: new Date(2015, 3, 1),
      max: dayjs().endOf("day").subtract(1, "hours").toDate(),
      views: Object.keys(Views).map((k) => Views[k]),
    }),
    [],
  )

  return (
    <div className="h-[1000px]" {...props}>
      <Calendar
        selectable
        // components={components}
        defaultDate={defaultDate}
        events={events}
        localizer={djLocalizer}
        max={max}
        showMultiDayTimes
        step={60}
        views={views}
        defaultView="month"
      />
    </div>
  )
}
