import React from "react";
import "./exampleui.scss";
import useDebounce from "../../hooks/useDebounce";
import { useAppStore, useLogStore } from "../../hooks/useStore";

const WebApp = () => {
  // Separate stores for app state and its change logging
  const appState = useAppStore((state) => state);
  const logState = useDebounce(useLogStore((state) => state));

  // Update state for appropriate field
  const changeHandler = (e) => {
    const { name, value, checked } = e.target;
    switch (name) {
      case "username":
        appState.setUsername(value);
        logStateEvent(name, appState.username, value);
        break;
      case "score":
        appState.setScore(value);
        logStateEvent(name, appState.score, value);
        break;
      case "preference_one":
        appState.setPrefOne(checked);
        logStateEvent(name, appState.preference_one, value);
        break;
      case "preference_two":
        appState.setPrefTwo(checked);
        logStateEvent(name, appState.preference_two, value);
        break;
      default:
        console.log(`Error: Field not handled: ${name}`);
    }
  };

  // Log state change event to separate change log
  const logStateEvent = async (field, prevValue, newValue) => {
    await logState.addLog({
      datetime: new Date(),
      state_key: field,
      prev_val: prevValue,
      new_val: newValue,
    });
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
