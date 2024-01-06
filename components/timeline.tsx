// import { Calendar, momentLocalizer } from "react-big-calendar"

// export const Timeline = () => {
//     // return <div className="h-[320]px w-16 bg-sky-500">Sa</div>
//     const localizer = momentLocalizer(moment)
//     return (
//         <>
//             <Calendar
//                 localizer={localizer}
//                 events={myEventsList}
//                 startAccessor="start"
//                 endAccessor="end"
//             />
//         </>
//     )
// }

"use client"

import React, { Fragment, useMemo } from "react"
import dayjs from "dayjs"
import { Calendar, Views, dayjsLocalizer } from "react-big-calendar"
import events from "components/resources/demo/events"
import "react-big-calendar/lib/css/react-big-calendar.css"

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
        <Fragment>
            <div className="height600" {...props}>
                <Calendar
                    components={components}
                    defaultDate={defaultDate}
                    events={events}
                    localizer={djLocalizer}
                    max={max}
                    showMultiDayTimes
                    step={60}
                    views={views}
                />
            </div>
        </Fragment>
    )
}
