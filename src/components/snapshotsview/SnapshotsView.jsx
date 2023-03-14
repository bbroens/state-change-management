import React from "react";
import "./snapshotsview.scss";
import { useSnapshotsStore } from "../../hooks/useStore";

const SnapshotsView = () => {
  const snapshotsState = useSnapshotsStore((state) => state);

  if (snapshotsState.snapshots.length) {
    const snapshotsSize = new Blob([JSON.stringify(snapshotsState.snapshots)])
      .size;

    return (
      <div className="snapshotView">
        <strong>
          Snapshots total size: {Math.round((snapshotsSize * 100) / 1024) / 100}{" "}
          KiB (No limit set, no logging treshold set.)
        </strong>
        <hr />
        {snapshotsState.snapshots.map((snapshot, index) => (
          <div className="snapshot" key={index}>
            {`Snapshot @ ${snapshot.datetime.getHours()}:${snapshot.datetime.getMinutes()}:${snapshot.datetime.getSeconds()} `}
            <span className="snapshotInfo">
              {JSON.stringify(snapshot.snapshot)}
            </span>
            <div className="deltaInfo">
              {`Δ: ${JSON.stringify(snapshot.delta)}`}
            </div>
          </div>
        ))}
      </div>
    );
  }
  return <div className="snapshotView">No snapshots yet</div>;
};

export default SnapshotsView;
