import { useState } from "react"

export function getWeekDates(inputDate: Date): Date[] {
  // 入力された日付の曜日を取得 (0: 日曜日, 1: 月曜日, ..., 6: 土曜日)
  const dayOfWeek = inputDate.getDay()

  // 月曜日から開始するため、入力日から曜日分引く
  const mondayDate = new Date(inputDate)
  mondayDate.setDate(inputDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1))

  // 週の日付を格納する配列を初期化
  const weekDates: Date[] = []

  // 月曜日から日曜日までの日付を配列に追加
  for (let i = 0; i < 7; i++) {
    const currentDate = new Date(mondayDate)
    currentDate.setDate(mondayDate.getDate() + i)
    weekDates.push(currentDate)
  }

  return weekDates
}

// // テスト
// const inputDate = new Date() // 今日の日付を取得
// const weekDates = getWeekDates(inputDate)

// // 結果をコンソールに出力
// weekDates.forEach((date) => {
//   console.log(date.toISOString().split("T")[0]) // 日付をYYYY-MM-DD形式で表示
// })

interface CalendarProps {
  startDate?: Date
}

export const WeeklyView: React.FC<CalendarProps> = ({
  startDate: initialStartDate = new Date(),
}) => {
  const [startDate, setStartDate] = useState<Date>(initialStartDate)
  const [weekDates, setWeekDates] = useState<Date[]>(getWeekDates(startDate))

  const handleDateChange = (newDate: Date) => {
    setStartDate(newDate)
    setWeekDates(getWeekDates(newDate))
  }

  return (
    <div>
      <h2>Weekly Calendar</h2>
      <div>
        <label htmlFor="startDate">Start Date:</label>
        <input
          type="date"
          id="startDate"
          value={startDate.toISOString().split("T")[0]}
          onChange={(e) => handleDateChange(new Date(e.target.value))}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {weekDates.map((date, index) => (
            <tr key={index}>
              <td>{["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][date.getDay()]}</td>
              <td>{date.toISOString().split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
