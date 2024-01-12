"use client"
import React, { useState } from "react"
import dayjs from "dayjs"
import "dayjs/locale/en" // Import the locale you want to use

// Define the calendar component with TypeScript
export const DailyCalendar: React.FC = () => {
    // State to track the current day
    const [currentDay, setCurrentDay] = useState(dayjs())

    // Function to move to the next day
    const nextDay = () => setCurrentDay(currentDay.add(1, "day"))

    // Function to move to the previous day
    const prevDay = () => setCurrentDay(currentDay.subtract(1, "day"))

    // Render the calendar
    return (
        <div className="flex flex-col items-center p-4">
            {/* Navigation buttons */}
            <div className="flex mb-4">
                <button
                    onClick={prevDay}
                    className="px-4 py-2 bg-gray-200 rounded-l hover:bg-gray-300"
                >
                    Prev
                </button>
                <button
                    onClick={nextDay}
                    className="px-4 py-2 bg-gray-200 rounded-r hover:bg-gray-300"
                >
                    Next
                </button>
            </div>

            {/* Current day display */}
            <div className="text-xl font-bold mb-4">
                {currentDay.format("dddd, MMMM D, YYYY")}
            </div>

            {/* Daily events list (vertical layout) */}
            <div className="flex flex-col space-y-2">
                {/* Render events here */}
                {/* Example event */}
                <div className="px-4 py-2 bg-blue-100 rounded">
                    Event 1 - {currentDay.format("h:mm A")}
                </div>
                {/* Add more events dynamically */}
            </div>
        </div>
    )
}
