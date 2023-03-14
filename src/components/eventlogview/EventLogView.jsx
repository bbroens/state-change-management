import React from "react";
import "./eventlogview.scss";
import { useLogStore } from "../../hooks/useStore";

const EventLogView = () => {
  const logState = useLogStore((state) => state);

  if (logState.logs.length) {
    const logSize = new Blob([JSON.stringify(logState.logs)]).size;

    return (
      <div className="eventLogView">
        <strong>
          Log size: {Math.round((logSize * 100) / 1024) / 100} KiB (No limit
          set, no logging treshold set.)
        </strong>
        <hr />
        {logState.logs.map((log, index) => (
          <div className="logLine" key={index}>
            <span className="event">{`Event @ ${log.datetime.getHours()}:${log.datetime.getMinutes()}:${log.datetime.getSeconds()}`}</span>
            {`Changed state field `}
            <span className="key">{log.state_key}</span>
            {` from `}
            <span className="prevVal">{log.prev_val.toString()}</span>
            {` into `}
            <span className="newVal">{log.new_val.toString()}</span>
          </div>
        ))}
      </div>
    );
  }
  return <div className="eventLogView">No logs yet</div>;
};

export default EventLogView;
