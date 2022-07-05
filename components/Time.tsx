import { format } from "date-fns";
import { memo } from "react";

const Time = ({ realTime, time }: { realTime: string; time?: Date }) => {
  if (time) {
    return <p>SERVER TIME : {format(new Date(time), "kk:mm:ss O")}</p>;
  }
  return <p>{realTime}</p>;
};

export default memo(Time);
