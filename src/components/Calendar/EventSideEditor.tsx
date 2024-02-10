"use client"
import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { useSelectedEventStore } from "src/stores/stores"
import { EventComponentProps } from "src/types"

import { EditorCard } from "src/components/calendar/EditorCard"

type AnimateEditorProps = {
  children: React.ReactNode
  previousID: EventComponentProps["id"] | undefined
}

const AnimateEditor: React.FC<AnimateEditorProps> = ({ children, previousID }) => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const id = selectedEvent?.id
  const width = "500px"
  const styleProps = "fixed right-0 top-10 h-screen bg-gray-200 shadow-xl"

  return (
    <AnimatePresence>
      {(() => {
        if (id !== undefined && previousID === undefined) {
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

        if (id && previousID !== undefined) {
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

export const EventSideEditor: React.FC = () => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)

  const id = selectedEvent?.id

  const [previousID, setPreviousID] = useState<string | undefined>()

  useEffect(() => {
    setPreviousID(id)
  }, [id])

  return (
    <AnimateEditor previousID={previousID}>
      <EditorCard setPreviousID={setPreviousID} />
    </AnimateEditor>
  )
}
