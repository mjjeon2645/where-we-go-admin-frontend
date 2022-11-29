import { Reset } from 'styled-reset';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div>
      <Reset />
      <GlobalStyle />
      <p>
        Hello, world!
      </p>
    </div>
  );
}
