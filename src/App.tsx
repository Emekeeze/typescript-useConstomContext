import AddTimer from './components/AddTimer';
import Header from './components/Header';
import Timers from './components/Timers';
import {TimerContextProvider} from './Store/Timer-context';

function App() {
  return (
    <TimerContextProvider>
      <Header />
      <main>
        <AddTimer />
        <Timers />
      </main>
    </TimerContextProvider>
  );
}

export default App;
