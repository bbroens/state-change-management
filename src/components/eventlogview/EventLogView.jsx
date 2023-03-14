import React from "react";
import "./eventlogview.scss";
import { useLogStore } from "../../hooks/useStore";

const EventLogView = () => {
  const logState = useLogStore((state) => state);

  return <div className="eventLogView">EventLogView</div>;
};

export default EventLogView;
