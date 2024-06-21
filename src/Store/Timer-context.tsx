import { createContext, type ReactNode, useContext, useState } from "react";

type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

type TimerContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  stopTimer: () => void;
  startTimer: () => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export function useTimerContext() {
  const TimersCtx = useContext(TimerContext);
  if (TimersCtx === null) {
    throw new Error("context cannot be null");
  }
  return TimersCtx;
}

type TimerContextProviderProps = {
  children: ReactNode;
};

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timers, setTimers] = useState<Timer[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addTimer = (timerData: Timer) => {
    setTimers((prevTimers) => [...prevTimers, timerData]);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const startTimer = () => {
    setIsRunning(true);
  };

  const ctx: TimerContextValue = {
    timers,
    isRunning,
    addTimer,
    stopTimer,
    startTimer,
  };

  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
}

export { TimerContextProvider, TimerContext };
