import React from "react";
import "./exampleui.scss";
import useDebounce from "../../hooks/useDebounce";
import {
  useAppStore,
  useLogStore,
  useSnapshotsStore,
} from "../../hooks/useStore";

const WebApp = () => {
  // Separate stores for app state and its change logging
  const appState = useAppStore((state) => state);
  const logState = useLogStore((state) => state);
  const snapshotsState = useSnapshotsStore((state) => state);

  // Update app state for appropriate field and call state change handler
  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "username":
        appState.setUsername(value);
        handleChangeLogging(name, appState.username, value);
        break;
      case "score":
        appState.setScore(value);
        handleChangeLogging(name, appState.score, value);
        break;
      case "preference_one":
        appState.setPrefOne(checked);
        handleChangeLogging(name, appState.preference_one, checked);
        break;
      case "preference_two":
        appState.setPrefTwo(checked);
        handleChangeLogging(name, appState.preference_two, checked);
        break;
      default:
        console.log(`Error: Field not handled: ${name}`);
    }
  };

  // Set a new log on state change & check if snapshot is needed.
  const handleChangeLogging = (field, prev_val, new_val) => {
    handleEventLogging(field, prev_val, new_val);
    handleSnapshots();
  };

  // Log state change event to separate change log
  const handleEventLogging = async (field, prevValue, newValue) => {
    await logState.addLog({
      datetime: new Date(),
      state_key: field,
      prev_val: prevValue,
      new_val: newValue,
    });
  };

  const handleSnapshots = () => {
    // Create a new snapshot once in every 10 logs
    if (logState.logs.length % 10 === 0 && logState.logs.length > 0) {
      // Calculate differences between app state and previous snapshot
      const getDifference = (prevSnapshot, state) => {
        let diff = Object.keys(state).reduce((diff, key) => {
          if (prevSnapshot[key] === state[key]) return diff;
          return {
            ...diff,
            [key]: state[key],
          };
        }, {});

        return diff;
      };

      // If a previous snapshot exists, compare delta between now and then
      let deltaState = appState;
      if (snapshotsState.snapshots[snapshotsState.snapshots.length - 1]) {
        const lastSnapshot =
          snapshotsState.snapshots[snapshotsState.snapshots.length - 1]
            .snapshot;
        deltaState = getDifference(lastSnapshot, appState);
      }

      // Store only the updated pieces of the state if possible (snapshot delta)
      snapshotsState.addSnapshot({
        datetime: new Date(),
        delta: deltaState,
        snapshot: appState,
      });
    }
  };

  return (
    <div className="example-ui">
      <h1>Example UI with app-level state</h1>
      <form>
        <section className="textSection">
          Username:
          <input
            type="text"
            name="username"
            value={appState.username}
            onChange={changeHandler}
          />
          Score:
          <input
            type="number"
            name="score"
            value={appState.score}
            onChange={changeHandler}
          />
        </section>
        <section className="checkboxSection">
          <p>Some preferences:</p>
          <div>
            <input
              type="checkbox"
              name="preference_one"
              checked={appState.preference_one && "checked"}
              onChange={changeHandler}
            />{" "}
            Preference one
          </div>
          <div>
            <input
              type="checkbox"
              name="preference_two"
              checked={appState.preference_two && "checked"}
              onChange={changeHandler}
            />{" "}
            Preference two
          </div>
        </section>
      </form>
    </div>
  );
};

export default WebApp;
