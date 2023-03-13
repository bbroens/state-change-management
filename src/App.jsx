import React from "react";
import "./app.scss";
import ExampleUI from "../src/components/exampleui/ExampleUI";
import EventLogview from "../src/components/eventlogview/EventLogview";
import SnapshotsView from "../src/components/snapshotsview/SnapshotsView";

function App() {
  // An example UI, with a state living on App level.
  // In this entire app, two mechanisms track state changes.
  // Both mechanisms have their own view below the example UI.

  return (
    <div className="App">
      <ExampleUI />
      <EventLogview />
      <SnapshotsView />
    </div>
  );
}

export default App;
