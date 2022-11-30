import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NewPlacePage from './pages/NewPlacePage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import PlacesPage from './pages/PlacesPage';
import UserReviewsPage from './pages/UserReviewsPage';
import GlobalStyle from './styles/GlobalStyle';

export default function App() {
  return (
    <div>
      <Reset />
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/places" element={<PlacesPage />} />
        <Route path="/places/:id" element={<PlaceDetailPage />} />
        <Route path="/places/new" element={<NewPlacePage />} />
        <Route path="/reviews" element={<UserReviewsPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </div>
  );
}
