import { useEffect, useState } from "react";

type DebounceParameters = {
  value: any;
  delay: number;
};

type DebounceState = {
  debouncedValue: any;
  setDebouncedValue: () => void;
};

const useDebounce = ({ value, delay = 500 }: DebounceParameters) => {
  const [debouncedValue, setDebouncedValue] = useState<DebounceState>(value);

  // Debounce: Only return value once timeout has passed.
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
