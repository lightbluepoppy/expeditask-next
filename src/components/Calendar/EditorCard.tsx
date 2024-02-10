import { Button } from "src/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "src/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "src/components/ui/form"
import { useSelectedEventStore } from "src/stores/stores"
import { localeDate, localeTime } from "src/utils/utils"
import { X } from "lucide-react"
import { useState } from "react"
import { CalendarEvent } from "src/types"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "src/components/ui/input"
const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/

const timeFormat = z
  .string()
  // 00:00 to 23:59
  .refine((timeString) => timeRegex.test(timeString), {
    message: "Time must be in the format HH:mm.",
  })

const dateRegex =
  // from the year 2000 to 2099
  /^(20\d{2})\-(0[1-9]|1[0-2])\-(0[1-9]|[12][0-9]|3[01])$/

const dateFormat = z
  .string()
  .pipe(z.coerce.date())
  .refine((dateString) => dateRegex.test(dateString.toISOString()), {
    message: "Input must be in the format YYYY-MM-DD",
  })

const formSchema = z
  .object({
    title: z.string().min(2).max(32, {
      message: "Event title must be between 2 and 32 characters long.",
    }),
    startDate: dateFormat,
    startTime: timeFormat,
    endDate: dateFormat,
    endTime: timeFormat,
  })
  .refine(
    (data) => {
      const startDateTime = new Date(`${data.startDate}T${data.startTime}:00`)
      const endDateTime = new Date(`${data.endDate}T${data.endTime}:00`)
      return endDateTime >= startDateTime
    },
    {
      message: "End date and time must be later or equal to start date and time.",
      path: ["endDate"], // This tells Zod to associate the error with the endDate field
    },
  )

type EventDateInput = React.FC<{
  time: string
}>

export const EventDateForm: EventDateInput = ({ time }) => (
  <form className="flex w-28 flex-row justify-start gap-1 text-sm text-slate-500">
    <input
      className="w-20 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
      defaultValue={localeDate(time)}
    ></input>
    <input
      className="w-10 outline-none transition duration-300 ease-in-out focus:bg-gray-100"
      defaultValue={localeTime(time)}
    ></input>
  </form>
)

type EditorCard = React.FC<{
  setPreviousID: (value: React.SetStateAction<string | undefined>) => void
}>

export const EditorCard: EditorCard = ({ setPreviousID }) => {
  const selectedEvent = useSelectedEventStore((state) => state.selectedEvent)
  const resetSelectedEvent = useSelectedEventStore((state) => state.resetSelectedEvent)

  // const [newEvent, setNewEvent] = useState<CalendarEvent>()

  const handleClose = () => {
    resetSelectedEvent()
    setPreviousID(undefined)
    console.log(new Date())
  }

  const handleFormSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  })

  const handleCreateEvent = (values: z.infer<typeof formSchema>) => {
    // return values
  }

  const { title, startTime, endTime } = selectedEvent ?? {}

  return (
    <Card>
      <CardHeader>
        <div id="utility-buttons" className="flex flex-row justify-end">
          <X className="cursor-pointer text-gray-500" onClick={handleClose} />
        </div>
        <CardTitle>
          <Form {...form}>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex w-full flex-row justify-start gap-1">
                  <FormControl>
                    <input
                      className="w-full bg-none outline-none transition duration-300 ease-in-out focus:bg-gray-100"
                      defaultValue={title}
                      {...field}
                    ></input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
        </CardTitle>
        <CardContent className="p-0">
          {[startTime, endTime].map((time) => (
            <EventDateForm key={time} time={time!} />
          ))}
        </CardContent>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Form {...form}>
          {/* <form onSubmit={handleCreateEvent}> */}
          <Button variant="destructive">Delete</Button>
          <Button variant="default" type="submit">
            Create
          </Button>
          {/* </form> */}
        </Form>
      </CardFooter>
    </Card>
  )
}
