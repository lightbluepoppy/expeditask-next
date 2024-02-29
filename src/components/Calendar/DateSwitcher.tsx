"use client"
import { useSelectedDateStore } from "src/stores/stores"
import { localeDate } from "src/libs/utils"

export const DateSwitcher: React.FC = () => {
  const selectedDate = useSelectedDateStore((state) => state.selectedDate)
  const setSelectedDate = useSelectedDateStore((state) => state.setSelectedDate)
  const changeSelectedDateBy = useSelectedDateStore((state) => state.changeSelectedDateBy)

  const buttonStyle =
    "rounded bg-blue-500 px-4 py-1 text-sm font-bold text-white hover:bg-blue-700"

  return (
    <div className="flex flex-row items-center gap-1">
      <p>{localeDate(selectedDate)}</p>
      <div className="flex items-center justify-center space-x-4">
        <button onClick={() => changeSelectedDateBy(-7)} className={buttonStyle}>
          &lt;&lt;
        </button>
        <button onClick={() => changeSelectedDateBy(-1)} className={buttonStyle}>
          &lt;
        </button>
        <button
          onClick={() => setSelectedDate(new Date("2024-01-10"))}
          className={buttonStyle}
        >
          .
        </button>
        <button onClick={() => changeSelectedDateBy(1)} className={buttonStyle}>
          &gt;
        </button>
        <button onClick={() => changeSelectedDateBy(7)} className={buttonStyle}>
          &gt;&gt;
        </button>
      </div>
    </div>
  )
}
