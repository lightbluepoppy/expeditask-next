import { db } from "backend/db/server"
import { Calendar } from "src/components/calendar/Calendar"

const Dashboard = async () => {
  // const tasks = await db.query.tasks.findMany()
  return (
    <>
      {/* <div>{tasks.toString()}</div> */}
      <Calendar />
    </>
  )
}

export default Dashboard
