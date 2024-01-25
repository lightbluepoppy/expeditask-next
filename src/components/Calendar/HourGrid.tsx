export const HourGrid: React.FC = () => {
  const hours: number[] = Array.from({ length: 23 }, (_, i) => i + 1)
  return (
    <>
      {hours.map((hour) => (
        <div key={hour} className="h-100 w-full border-t border-slate-400"></div>
      ))}
    </>
  )
}
