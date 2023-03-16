import React from "react";
import "./snapshotsview.scss";
import { useSnapshotsStore } from "../../hooks/useStore";
import * as types from "../../types/store.types";

type SnapShotProps = {
  snapshot: types.Snapshot;
};

const SnapshotsView = () => {
  const snapshotsState = useSnapshotsStore<types.SnapshotStore>(
    (state) => state
  );

  // Detailed snapshot line element for log
  const SnapshotDetails = ({ snapshot }: SnapShotProps) => {
    const timestamp = snapshot.datetime;
    return (
      <div className="snapshot">
        {`Snapshot @ ${timestamp.getHours()}:${timestamp.getMinutes()}:${timestamp.getSeconds()} `}
        <span className="snapshotInfo">{JSON.stringify(snapshot.slice)}</span>
        <div className="delta">{`Δ: ${JSON.stringify(snapshot.delta)}`}</div>
      </div>
    );
  };

  if (snapshotsState.snapshots.length) {
    const snapshotsSize = new Blob([JSON.stringify(snapshotsState.snapshots)])
      .size;

    return (
      <div className="snapshotView">
        {`Snapshots: ${Math.round((snapshotsSize * 100) / 1024) / 100} KiB`}
        <hr />
        {snapshotsState.snapshots.map((snapshot, index) => (
          <SnapshotDetails key={index} snapshot={snapshot} />
        ))}
      </div>
    );
  }
  return (
    <div className="snapshotView">
      Snapshots will be generated once in every 10 events.
    </div>
  );
};

export default SnapshotsView;
