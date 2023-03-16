import React from "react";
import "./eventlogview.scss";
import { useLogStore } from "../../hooks/useStore";
import * as types from "../../types/store.types";

type LogLineProps = {
  log: types.Log;
  index: number;
};

const EventLogView = () => {
  const logStore = useLogStore<types.LogStore>((state) => state);

  // Detailed log line element
  const LogLine = ({ log, index }: LogLineProps) => {
    return (
      <div className="logLine">
        <span className="event">
          {`Event @ ${log.datetime.getHours()}:${log.datetime.getMinutes()}:${log.datetime.getSeconds()}`}
        </span>
        {`Changed state field `}
        <span className="key">{log.state_key}</span>
        {` from `}
        <span className="prevVal">{log.prev_val.toString()}</span>
        {` into `}
        <span className="newVal">{log.new_val.toString()}</span>
      </div>
    );
  };

  if (logStore.logs.length) {
    const logSize = new Blob([JSON.stringify(logStore.logs)]).size;

    return (
      <div className="eventLogView">
        <strong>
          Log size: {Math.round((logSize * 100) / 1024) / 100} KiB
        </strong>
        <hr />
        {logStore.logs.map((log, index) => (
          <LogLine key={index} log={log} index={index} />
        ))}
      </div>
    );
  }
  return <div className="eventLogView">State changes will be logged here.</div>;
};

export default EventLogView;
