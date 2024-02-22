import type {
  InsertEvent,
  InsertEventInstance,
  SelectEvent,
  SelectEventInstance,
} from "src/types"
import { db } from "backend/db/server"
import { events, eventInstances } from "backend/db/schema/schema"
import { eq } from "drizzle-orm"
import type { QueryProps, QueryAllProps } from "src/types"
import { createId } from "@paralleldrive/cuid2"

class InternalServerError extends Error {
  name = "InternalServerError"
}

export async function getEvent(eventId: SelectEvent["eventId"]) {
  try {
    const res = await db.select().from(events).where(eq(events.eventId, eventId))
    if (!res) throw new InternalServerError()
    return res
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}

export async function getAllEvents() {
  try {
    const res = await db.select().from(events)
    if (!res) throw new InternalServerError()
    return res
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}

// export async function get(
//   props: QueryProps,
//   id: SelectEvent["eventId"] | SelectEventInstance["eventInstanceId"],
// ) {
//   const propsId = `${props._.name.slice(0, -1)}Id` as keyof typeof props
//   try {
//     const res = await db
//       .select()
//       .from(props)
//       .where(eq(props[propsId] as any, id))

//     if (!res) throw new InternalServerError()
//     return res
//   } catch (error) {
//     if (error instanceof InternalServerError) {
//       console.error(error.message)
//       return
//     }
//   }
// }

// export async function getAll(props: QueryAllProps) {
//   try {
//     const res = await db.select().from(props)
//     if (!res) throw new InternalServerError()
//     return res
//   } catch (error) {
//     if (error instanceof InternalServerError) {
//       console.error(error.message)
//       return
//     }
//   }
// }

export async function getEventInstance(
  eventInstanceId: SelectEventInstance["eventInstanceId"],
) {
  try {
    const res = await db
      .select()
      .from(eventInstances)
      .where(eq(eventInstances.eventInstanceId, eventInstanceId))

    if (!res) throw new InternalServerError()
    return res
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}

export async function getAllEventInstances() {
  try {
    const res = await db.select().from(eventInstances)
    if (!res) throw new InternalServerError()
    return res
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}

export async function createEvent(event: InsertEvent) {
  event.eventId = createId()

  try {
    const res = await db.insert(events).values(event)
    if (!res) throw new InternalServerError()
    return getEvent(event.eventId)
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}

export async function createEventInstance(eventInstance: InsertEventInstance) {
  eventInstance.eventInstanceId = createId()

  try {
    const res = await db.insert(eventInstances).values(eventInstance)
    if (!res) throw new InternalServerError()
    return getEventInstance(eventInstance.eventInstanceId)
  } catch (error) {
    if (error instanceof InternalServerError) {
      console.error(error.message)
      return
    }
  }
}
