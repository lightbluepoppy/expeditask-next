"use client"
import { useSelectedDateStore } from "src/store/useSelectedDateStore"
import { localeDate } from "src/utils/locale"

export const DateSwitcher: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate)
  const changeSelectedDate = useSelectedDateStore((state) => state.changeSelectedDate)

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center justify-center space-x-4 p-4">
        <button
          onClick={() => changeSelectedDate(-7)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          &lt;&lt;
        </button>
        <button
          onClick={() => changeSelectedDate(-1)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          &lt;
        </button>
        <button
          onClick={() => setSelectedDate(new Date("2024-01-10"))}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          .
        </button>
        <button
          onClick={() => changeSelectedDate(1)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          &gt;
        </button>
        <button
          onClick={() => changeSelectedDate(7)}
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          &gt;&gt;
        </button>
      </div>
      <p>{localeDate(selectedDate)}</p>
    </div>
  )
}