import { createContext, type ReactNode, useContext, useReducer } from "react";


export type Timer = {
  name: string;
  duration: number;
};

type TimerState = {
  isRunning: boolean;
  timers: Timer[];
};

const initialState: TimerState = {
  isRunning: false,
  timers: []
};

type TimerContextValue = TimerState & {
  addTimer: (timerData: Timer) => void;
  stopTimer: () => void;
  startTimer: () => void;
};

const TimerContext = createContext<TimerContextValue | null>(null);

export function useTimerContext() {
  const timersCtx = useContext(TimerContext);
  if (timersCtx === null) {
    throw new Error("context cannot be null");
  }
  return timersCtx;
}

type TimerContextProviderProps = {
  children: ReactNode;
};

type Action = 
  | { type: "ADD_TIMER"; payload: Timer }
  | { type: "STOP_TIMERS" }
  | { type: "START_TIMERS" };

function timerReducer(state: TimerState, action: Action): TimerState {
  switch (action.type) {
    case "ADD_TIMER":
      return {
        ...state,
        timers: [...state.timers, action.payload],
      };
    case "STOP_TIMERS":
      return {
        ...state,
        isRunning: false,
      };
    case "START_TIMERS":
      return {
        ...state,
        isRunning: true,
      };
    default:
      return state;
  }
}

function TimerContextProvider({ children }: TimerContextProviderProps) {
  const [timerState, dispatch] = useReducer(timerReducer, initialState);

  const addTimer = (timerData: Timer) => {
    dispatch({ type: "ADD_TIMER", payload: timerData });
  };

  const stopTimer = () => {
    dispatch({ type: "STOP_TIMERS" });
  };

  const startTimer = () => {
    dispatch({ type: "START_TIMERS" });
  };

  const ctx: TimerContextValue = {
    ...timerState,
    addTimer,
    stopTimer,
    startTimer,
  };

  return <TimerContext.Provider value={ctx}>{children}</TimerContext.Provider>;
}

export { TimerContextProvider, TimerContext };
