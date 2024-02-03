"use client"
import { useState, useEffect } from "react"
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
import { EventComponentProps } from "src/types"

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

type AnimateEditorProps = {
  children: React.ReactNode
  id: EventComponentProps["id"]
  previousID: EventComponentProps["id"]
}

// const AnimateEditor: React.FC<AnimateEditorProps> = ({ children, id, previousID }) => {
//   const width = "500px"
//   const props = {
//     initial: id !== "" && previousID === "" ? { right: `-${width}`, opacity: 0 } : {},
//     animate: id !== "" && previousID === "" ? { opacity: 1 } : { opacity: 1 },
//     exit:
//       id !== "" && previousID === ""
//         ? { right: `-${width}`, opacity: 0 }
//         : { opacity: 0 },
//   }

//   return (
//     <AnimatePresence>
//       {/* {id !== "" && ( */}
//       <motion.div
//         key={`event-editor-${id}`}
//         initial={props.initial}
//         animate={props.animate}
//         exit={props.exit}
//         className="fixed right-0 top-10 h-screen bg-gray-200 shadow-xl"
//         style={{ width: width }}
//       >
//         {children}
//       </motion.div>
//       {/* )} */}
//     </AnimatePresence>
//   )

// const AnimateEditor: React.FC<AnimateEditorProps> = ({ children, id, previousID }) => {
//   const width = "500px"
//   let initial, animate, exit

//   if (id !== "" && previousID === "") {
//     initial = { right: `-${width}`, opacity: 0 }
//     animate = { right: 0, opacity: 1 }
//     exit = { right: `-${width}`, opacity: 0 }
//   }

//   if (id !== "" && previousID !== "") {
//     initial = {}
//     animate = { opacity: 1 }
//     exit = { right: `-${width}`, opacity: 0 }
//   }

//   return (
//     <AnimatePresence>
//       <motion.div
//         key={`event-editor-${id}`}
//         initial={initial}
//         animate={animate}
//         exit={exit}
//         className="fixed right-0 top-10 h-screen bg-gray-200 shadow-xl"
//         style={{ width: width }}
//       >
//         {children}
//       </motion.div>
//     </AnimatePresence>
//   )
// }

const AnimateEditor: React.FC<AnimateEditorProps> = ({ children, id, previousID }) => {
  const width = "500px"
  const styleProps = "fixed right-0 top-10 h-screen bg-gray-200 shadow-xl"

  return (
    <AnimatePresence>
      {(() => {
        if (id !== "" && previousID === "") {
          return (
            <motion.div
              key={`event-editor-${id}`}
              initial={{ right: `-${width}`, opacity: 0 }}
              animate={{ right: 0, opacity: 1 }}
              exit={{ right: `-${width}`, opacity: 0 }}
              className={styleProps}
              style={{ width: width }}
            >
              {children}
            </motion.div>
          )
        }

        if (id !== "" && previousID !== "") {
          return (
            <motion.div
              key={`event-editor-${id}`}
              animate={{ opacity: 1 }}
              exit={{ right: `-${width}`, opacity: 0 }}
              className={styleProps}
              style={{ width: width }}
            >
              {children}
            </motion.div>
          )
        }
      })()}
    </AnimatePresence>
  )
}

type EditorCardProps = {
  previousID: EventComponentProps["id"]
}

const EditorCard: React.FC<EditorCardProps> = ({ previousID }) => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const resetSelectedEvent = useSelectedEventStore((state) => state.resetSelectedEvent)
  const handleClose = () => {
    resetSelectedEvent()
  }

  const { id, title, startTime, endTime } = selectedEvent
  return (
    <AnimateEditor id={id} previousID={previousID}>
      <Card>
        <CardHeader>
          <div id="utility-buttons" className="flex flex-row justify-end">
            <X className="cursor-pointer text-gray-500" onClick={handleClose} />
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
    </AnimateEditor>
  )
}

export const EventSideEditor: React.FC = () => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const id = selectedEvent.id

  const [previousID, setPreviousID] = useState("")

  useEffect(() => {
    setPreviousID(id)
    console.log("Side effect")
  }, [selectedEvent])

  return (
    <AnimateEditor id={id} previousID={previousID}>
      <EditorCard previousID={previousID} />
    </AnimateEditor>
  )
}
