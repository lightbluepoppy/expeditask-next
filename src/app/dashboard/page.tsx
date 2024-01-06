"use client"
import { db } from "backend/db/server"
import { Dayjs } from "components/Calendar"

const Dashboard = async () => {
    // const tasks = await db.query.tasks.findMany()
    return (
        <>
            {/* <div>{tasks.toString()}</div> */}
            <Dayjs />
        </>
    )
}

export default Dashboard
