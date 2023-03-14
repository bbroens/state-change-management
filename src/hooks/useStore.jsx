import { create } from "zustand";

export const useAppStore = create((set) => ({
  // Initial app state
  username: "",
  score: 0,
  preference_one: false,
  preference_two: false,

  // Methods to set app state
  setUsername: (input) => set(() => ({ username: input })),
  setScore: (input) => set(() => ({ score: input })),
  setPrefOne: (input) => set(() => ({ preference_one: input })),
  setPrefTwo: (input) => set(() => ({ preference_two: input })),
}));

export const useLogStore = create((set) => ({
  // Initial state change logs
  logs: [],

  // Method to add logs to state
  addLog: (input) => {
    set((state) => ({
      logs: [
        ...state.logs,
        {
          datetime: input.datetime,
          state_key: input.state_key,
          prev_val: input.prev_val,
          new_val: input.new_val,
        },
      ],
    }));
  },
}));
