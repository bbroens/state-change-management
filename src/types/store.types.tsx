export interface AppStore {
  username: string;
  score: number;
  preference_one: boolean;
  preference_two: boolean;
  setUsername: (input: string) => void;
  setScore: (input: number) => void;
  setPrefOne: (input: boolean) => void;
  setPrefTwo: (input: boolean) => void;
}

export interface LogStore {
  logs: Array<Log>;
  addLog: (input: Log) => void;
}

export interface SnapshotStore {
  snapshots: Array<Snapshot>;
  addSnapshot: (input: Snapshot) => void;
}

export type Log = {
  datetime: Date;
  state_key: string;
  prev_val: string | number | boolean;
  new_val: string | number | boolean;
};

export type Slice = {
  username: string;
  score: number;
  preference_one: boolean;
  preference_two: boolean;
};

export type Snapshot = {
  datetime: Date;
  delta: any; // Differential makes type flexible
  slice: Slice;
};
