import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localeDate(date: Date | string | undefined): string {
  if (typeof date === "string") date = new Date(date)
  return (
    date?.toLocaleDateString("ja-JP", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }) || "undefined"
  )
    .split("/")
    .join("-")
}

export function localeTime(date: Date | string | undefined): string {
  if (typeof date === "string") date = new Date(date)
  return (
    date?.toLocaleTimeString("en-US", {
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
    }) || "undefined"
  )
}

export function addMinutes(date: Date, minutes: number) {
  return new Date(date.getTime() + minutes * 60000)
}

export function toCapitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1)
}

export function getMondayDate(date: Date | string): Date {
  if (typeof date === "string") date = new Date(date)
  const dayOfWeek = date.getDay()
  const mondayDate = new Date(date)
  mondayDate.setDate(date.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))
  return mondayDate
}

export function getWeekDates(date: Date): Date[] {
  const mondayDate = getMondayDate(date)
  const weekDates: Date[] = []

  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(mondayDate)
    currentDate.setDate(mondayDate.getDate() + i)
    weekDates.push(currentDate)
  }

  return weekDates
}
