import Timer from "./Timer";
import { useTimerContext } from "../Store/Timer-context";

export default function Timers() {
  const { timers } = useTimerContext();

  return (
    <ul>
      {timers.map((timer) => (
        <li key={timer.name}>
          <Timer {...timer} />
        </li>
      ))}
    </ul>
  );
}

