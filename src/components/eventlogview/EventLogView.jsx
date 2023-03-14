import React from "react";
import "./eventlogview.scss";
import { useLogStore } from "../../hooks/useStore";

const EventLogView = () => {
  const logState = useLogStore((state) => state);

  if (logState.logs.length) {
    const logSize = new Blob([JSON.stringify(logState.logs)]).size;

    return (
      <div className="eventLogView">
        Log size: {Math.round((logSize * 100) / 1024) / 100} KiB (No limit set,
        no logging treshold set.)
        <hr />
        {logState.logs.map((log, index) => (
          <div className="logLine" key={index}>
            {`${log.datetime} - 
            Changed state field `}
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
  return <>No logs yet</>;
};

export default EventLogView;
