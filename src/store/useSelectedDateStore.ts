import { create } from "zustand"

type SelectedDateState = {
  selectedDate: Date
  setSelectedDate: (date: Date) => void
  changeSelectedDate: (day: number) => void
}

export const useSelectedDateStore = create<SelectedDateState>()((set) => ({
  selectedDate: new Date("2024-01-10"),
  setSelectedDate: (date) => set({ selectedDate: date }),
  changeSelectedDate: (day) =>
    set((state) => ({
      selectedDate: new Date(state.selectedDate.getTime() + day * 1000 * 60 * 60 * 24),
    })),
}))
