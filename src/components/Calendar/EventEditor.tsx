"use client"
import * as React from "react"
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
import { useSelectedEventStore } from "src/stores/stores"
import { localeDate, localeTime } from "src/utils/utils"
import { X } from "lucide-react"

export const EventEditor: React.FC = () => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const setSelectedEvent = useSelectedEventStore((state) => state.setSelectedEvent)
  const resetSelectedEvent = useSelectedEventStore((state) => state.resetSelectedEvent)

  const { id, title, startTime, endTime } = selectedEvent

  return (
    <AnimatePresence>
      {selectedEvent.id !== "" && (
        <motion.div
          key={`event-editor-${id}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="absolute w-[350px] rounded-lg shadow-xl"
          style={{ top: `${20}%` }}
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
                  <input
                    className="w-20 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                    defaultValue={localeDate(startTime)}
                  ></input>
                  <input
                    className="w-10 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                    defaultValue={localeTime(startTime)}
                  ></input>
                  -
                </form>
                <form className="flex w-28 flex-row justify-start gap-1 text-sm text-slate-500">
                  <input
                    className="w-20 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                    defaultValue={localeDate(endTime)}
                  ></input>
                  <input
                    className="w-10 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                    defaultValue={localeTime(endTime)}
                  ></input>
                </form>
              </CardContent>
              {/* {localeTime(startTime)} - {localeTime(endTime)} */}
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
              <Button variant="destructive">Delete</Button>
              {/* <Button onSubmit={(e) => setSelectedEvent({ startTime: e.target })}> */}
              {/*   Save */}
              {/* </Button> */}
            </CardFooter>
          </Card>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
