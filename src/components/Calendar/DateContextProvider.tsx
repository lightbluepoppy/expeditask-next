"use client"
import { useState, createContext } from "react"
import { Props } from "src/types"

type DateContext = {
  selectedDate: Date
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>
}

export const DateContext = createContext<DateContext>({} as DateContext)

export const DateContextProvider: React.FC<Props> = ({ children }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date("2024-01-09"))
  const value = { selectedDate, setSelectedDate }

  return <DateContext.Provider value={value}>{children}</DateContext.Provider>
}
