import { create } from "zustand"
import { SelectedDateStore, SelectedEventStore } from "src/types"

export const useSelectedDateStore = create<SelectedDateStore>()((set) => ({
  selectedDate: new Date("2024-01-10"),
  setSelectedDate: (date) => set({ selectedDate: date }),
  changeSelectedDate: (day) =>
    set((state) => ({
      selectedDate: new Date(state.selectedDate.getTime() + day * 1000 * 60 * 60 * 24),
    })),
}))

export const useSelectedEventStore = create<SelectedEventStore>()((set) => ({
  selectedEvent: "",
  setSelectedEvent: (eventID) => set({ selectedEvent: eventID }),
}))
