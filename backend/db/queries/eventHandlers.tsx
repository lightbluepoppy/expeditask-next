import { InsertEvent, InsertEventInstance } from "src/types"
import { db } from "backend/db/server"
import { events, eventInstances } from "backend/db/schema/schema"
import { eq } from "drizzle-orm"
import { createId } from "@paralleldrive/cuid2"

class InternalServerError extends Error {
  name = "InternalServerError"
}

async function createEvent(event: InsertEvent) {
  try {
    const res = await db.insert(events).values(event)
    if (!res) throw new InternalServerError()
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
    }
  }
}

export async function createEventInstance(eventInstance: InsertEventInstance) {
  eventInstance.eventInstanceID = createId()

  try {
    const res = await db.insert(eventInstances).values(eventInstance)
    if (!res) throw new InternalServerError()
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
    }
  }

  try {
    let eventInstanceParentEventID = await db
      .select({ eventID: eventInstances.eventID })
      .from(eventInstances)
      .where(eq(eventInstances.eventInstanceID, eventInstance.eventInstanceID))

    if (!eventInstanceParentEventID) throw new InternalServerError()

    // check if eventInstance is new
    if (!eventInstanceParentEventID?.[0].eventID) {
      const cuid = createId()
      await createEvent({
        title: eventInstance.title,
        eventID: cuid,
      })
      eventInstanceParentEventID[0].eventID = cuid
    }
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
    }
  }

  // const eventID = await db
  //   .select({ eventID: events.eventID })
  //   .from(events)
  //   .where(eq(events.eventID, eventInstanceParentEventID[0].eventID))

  // if (eventID[0].eventID === eventInstance.eventID) throw new InternalServerError()
}
