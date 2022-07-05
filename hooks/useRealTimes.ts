import { format } from "date-fns";
import { useEffect, useState } from "react";

const useRealTimes = () => {
  const [realTime, setRealTime] = useState(format(new Date(), "kk:mm:ss O"));

  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(format(new Date(), "kk:mm:ss O"));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return realTime;
};

export default useRealTimes;
