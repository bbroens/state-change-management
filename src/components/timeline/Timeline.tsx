import React, { useEffect, useState } from "react";
import "./timeline.scss";
import { useLogStore } from "../../hooks/useStore";
import * as types from "../../types/store.types";

type TickEvent = {
  tick: number;
  event: types.Log;
};

export const Timeline = () => {
  const logState = useLogStore<types.LogStore>((state) => state);

  // Use localstate to limit app-wide store operations
  const [ticks, setTicks] = useState<number>(1);
  const [tickEvents, setTickEvents] = useState<TickEvent[]>([]);

  useEffect(() => {
    const interval = setInterval(() => tick(), 500);
    return () => {
      clearInterval(interval);
    };
  }, [ticks]);

  const tick = () => {
    setTicks((prev) => ++prev);

    // Check logs for state change event during tick
    if (logState.logs.length) {
      const logs = logState.logs;
      const lastLoggedEvent = logs[logs.length - 1];

      // If there are fewer eventful ticks than logged events, make tick eventful
      if (tickEvents.length + 1 <= logs.length) {
        const newTickEvent = { tick: ticks, event: lastLoggedEvent };
        setTickEvents((prev) => [...prev, newTickEvent]);
      }
    }
  };

  // For every tick, add a block. If state change occured at that tick, light up block.
  return (
    <div className="timeline">
      {[...Array(ticks)].map((block, index) => (
        <div key={index} className="timelineBlock">
          {tickEvents.length > 0 &&
            tickEvents.filter((t) => t.tick === index).length > 0 && (
              <div className="lightUpEvent"></div>
            )}
        </div>
      ))}
    </div>
  );
};
