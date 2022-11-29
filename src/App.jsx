import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import PlacesPage from './pages/PlacesPage';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
