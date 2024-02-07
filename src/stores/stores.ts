import { create } from "zustand"
import { SelectedDateStore, SelectedEventStore } from "src/types"

export const useSelectedDateStore = create<SelectedDateStore>()((set) => ({
  selectedDate: new Date("2024-01-10"),
  setSelectedDate: (date) => set({ selectedDate: date }),
  changeSelectedDateBy: (day) =>
    set((state) => ({
      selectedDate: new Date(state.selectedDate.getTime() + day * 1000 * 60 * 60 * 24),
    })),
}))

export const useSelectedEventStore = create<SelectedEventStore>()((set) => ({
  // selectedEvent: {
  //   id: "",
  //   title: "",
  //   startTime: "",
  //   endTime: "",
  // },
  selectedEvent: undefined,
  setSelectedEvent: (event) => set({ selectedEvent: event }),
  resetSelectedEvent: () =>
    // set({
    //   selectedEvent: {
    //     id: "",
    //     title: "",
    //     startTime: "",
    //     endTime: "",
    //   },
    // }),
    set({ selectedEvent: undefined }),
}))

export const useCreateEventStore = create()((set) => ({
  // selectedEvent: useSelectedEventStore()
}))
