"use client"
import * as React from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "src/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import { useSelectedEventStore } from "src/stores/stores"
import { localeDate, localeTime } from "src/utils/utils"
import { X } from "lucide-react"

type EventDateInputProps = {
  className: string
  data: string
}

const EventDateInput: React.FC<EventDateInputProps> = ({ className, data }) => (
  <input
    className={`${className} outline-none transition duration-300 ease-in-out focus:bg-gray-100`}
    defaultValue={data}
  ></input>
)

export const EventEditor2: React.FC = () => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)
  const resetSelectedEvent = useSelectedEventStore((state) => state.resetSelectedEvent)

  const { id, title, startTime, endTime } = selectedEvent

  const width = "500px"

  return (
    <AnimatePresence>
      {selectedEvent.id !== "" && (
        <motion.div
          key={`event-editor-${id}`}
          initial={{ right: `-${width}`, opacity: 0 }}
          animate={{ right: 0, opacity: 1 }}
          exit={{ right: `-${width}`, opacity: 0 }}
          className="fixed right-0 top-10 h-screen bg-gray-200 shadow-xl"
          style={{ width: width }}
        >
          <Card>
            <CardHeader>
              <div id="utility-buttons" className="flex flex-row justify-end">
                <X
                  className="cursor-pointer text-gray-500"
                  onClick={() => resetSelectedEvent()}
                />
              </div>
              <CardTitle>
                <form className="flex w-full flex-row justify-start gap-1">
                  <input
                    className="w-full bg-none outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                    defaultValue={title}
                  ></input>
                </form>
              </CardTitle>
              <CardContent className="p-0">
                <form className="flex w-28 flex-row justify-start gap-1 text-sm text-slate-500">
                  <EventDateInput className="w-20" data={localeDate(startTime)} />
                  <EventDateInput className="w-10" data={localeTime(startTime)} />-
                </form>
                <form className="flex w-28 flex-row justify-start gap-1 text-sm text-slate-500">
                  <EventDateInput className="w-20" data={localeDate(endTime)} />
                  <EventDateInput className="w-10" data={localeTime(endTime)} />
                </form>
              </CardContent>
            </CardHeader>
            <CardFooter className="flex justify-between">
              <Button variant="destructive">Delete</Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
