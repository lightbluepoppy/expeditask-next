export const HourLabels: React.FC = () => {
  const hours: number[] = Array.from({ length: 23 }, (_, i) => i + 1)
  return (
    <div className="mx-1 my-2 flex flex-col justify-evenly">
      {hours.map((hour) => (
        <div key={hour} className="flex items-center justify-center text-xs font-light">
          <p>{hour < 10 ? "0" + hour : hour.toString()}:00</p>
        </div>
      ))}
    </div>
  )
}
