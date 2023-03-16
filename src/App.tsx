import React from "react";
import "./app.scss";
import ExampleUI from "./components/exampleui/ExampleUI";
import EventLogView from "./components/eventlogview/EventLogView";
import SnapshotsView from "./components/snapshotsview/SnapshotsView";
import { Timeline } from "./components/timeline/Timeline";

function App() {
  // An example UI, with a zustand hooks state living on App level.
  // In this entire app, two mechanisms track state changes.
  // Both mechanisms have their own view below the example UI.
  // The live timeline is hooked into the change event logs.

  return (
    <div className="App">
      <ExampleUI />
      <EventLogView />
      <SnapshotsView />
      <Timeline />
    </div>
  );
}

export default App;
