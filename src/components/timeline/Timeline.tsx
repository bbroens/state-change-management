import React, { useEffect, useState } from "react";
import "./timeline.scss";
import { useLogStore } from "../../hooks/useStore";
import * as types from "../../types/store.types";

type TickEvent = {
  tick: number;
  event: types.Log;
};

type LightUpBlockProps = {
  field: string;
  prev_val: number | string | boolean;
  new_val: number | string | boolean;
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

  const LightUpBlock = ({ field, prev_val, new_val }: LightUpBlockProps) => {
    return (
      <div
        className="lightUpBlock"
        title={`Changed ${field} from ${prev_val} into ${new_val}`}
      ></div>
    );
  };

  return (
    <div className="timeline">
      {
        // For every tick, add a block to timeline.
        [...Array(ticks)].map((block, index) => (
          <div key={index} className="timelineBlock">
            {
              // If state change occured at current tick, show lightup block.
              tickEvents.length > 0 &&
                tickEvents.filter((t) => t.tick === index).length > 0 && (
                  <LightUpBlock
                    field={tickEvents[tickEvents.length - 1].event.state_key}
                    prev_val={tickEvents[tickEvents.length - 1].event.prev_val}
                    new_val={tickEvents[tickEvents.length - 1].event.new_val}
                  />
                )
            }
          </div>
        ))
      }
    </div>
  );
};
