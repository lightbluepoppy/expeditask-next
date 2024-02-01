"use client"
import * as React from "react"
import { useEffect, useRef } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { Button } from "src/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import { Input } from "src/components/ui/input"
import { Label } from "src/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "src/components/ui/select"
import { useSelectedEventStore } from "src/stores/stores"
import { localeTime } from "src/utils/utils"

export const EventEditor: React.FC = () => {
  // const selectedEventID = useSelectedEventStore((state) => state.selectedEventID)
  // const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)
  const resetSelectedEvent = useSelectedEventStore((state) => state.resetSelectedEvent)

  const { id, title, startTime, endTime } = selectedEvent

  return (
    <AnimatePresence>
      {selectedEvent.id !== "" && (
        <motion.div
          key="event-editor"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute w-[350px] rounded-lg shadow-xl"
          style={{ top: `${20}%` }}
        >
          <Card>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
              <CardDescription>
                <form className="flex w-28 flex-row justify-start gap-1">
                  <input
                    className="w-10 outline-none"
                    defaultValue={localeTime(startTime)}
                  ></input>
                  <span>-</span>
                  <input
                    className="w-10 outline-none"
                    defaultValue={localeTime(endTime)}
                  ></input>
                </form>
                {/* {localeTime(startTime)} - {localeTime(endTime)} */}
              </CardDescription>
            </CardHeader>
            {/* <CardContent> */}
            {/*   <form> */}
            {/*     <div className="grid w-full items-center gap-4"> */}
            {/*       <div className="flex flex-col space-y-1.5"> */}
            {/*         <Label htmlFor="name">Name</Label> */}
            {/*         <Input id="name" placeholder="Name of your project" /> */}
            {/*       </div> */}
            {/*       <div className="flex flex-col space-y-1.5"> */}
            {/*         <Label htmlFor="framework">Framework</Label> */}
            {/*         <Select> */}
            {/*           <SelectTrigger id="framework"> */}
            {/*             <SelectValue placeholder="Select" /> */}
            {/*           </SelectTrigger> */}
            {/*           <SelectContent position="popper"> */}
            {/*             <SelectItem value="next">Next.js</SelectItem> */}
            {/*             <SelectItem value="sveltekit">SvelteKit</SelectItem> */}
            {/*             <SelectItem value="astro">Astro</SelectItem> */}
            {/*             <SelectItem value="nuxt">Nuxt.js</SelectItem> */}
            {/*           </SelectContent> */}
            {/*         </Select> */}
            {/*       </div> */}
            {/*     </div> */}
            {/*   </form> */}
            {/* </CardContent> */}
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => resetSelectedEvent()}>
                Cancel
              </Button>
              <Button onSubmit={(e) => setSelectedEvent({ startTime: e.target })}>
                Save
              </Button>
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
