import Container from './UI/Container.tsx';
import { type Timer as Timerprops} from "../Store/Timer-context"

export default function Timer({name, duration}: Timerprops) {
  return (
    <Container as="article">
      <h2>{name}</h2>
      <p>{duration}</p>
    </Container>
  );
}
