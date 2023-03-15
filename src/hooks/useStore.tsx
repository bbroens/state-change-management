import { create } from "zustand";
import { AppStore, LogStore, SnapshotStore } from "../types/store.types";

// Separate App state store for example app state
export const useAppStore = create<AppStore>((set) => ({
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

// Separate state store for app state event changes
export const useLogStore = create<LogStore>((set) => ({
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

// Separate state store for app state snapshots
export const useSnapshotsStore = create<SnapshotStore>((set) => ({
  // Initial state snapshots
  snapshots: [],

  // Method to add snapshots to state
  addSnapshot: (input) => {
    set((state) => ({
      snapshots: [
        ...state.snapshots,
        {
          datetime: input.datetime,
          delta: input.delta,
          slice: input.slice,
        },
      ],
    }));
  },
}));
