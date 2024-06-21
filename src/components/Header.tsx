import Button from './UI/Button.tsx';
import { useTimerContext } from '../Store/Timer-context.tsx';

export default function Header() {
  const TimersCtx = useTimerContext();
  
  const handleButtonClick = () => {
    if (TimersCtx.isRunning) {
      TimersCtx.stopTimer();
    } else {
      TimersCtx.startTimer();
    }
  };

  return (
    <header>
      <h1>ReactTimer</h1>
      <Button onClick={handleButtonClick}>
        {TimersCtx.isRunning ? "Stop Timers" : "Start Timers"}
      </Button>
    </header>
  );
}
