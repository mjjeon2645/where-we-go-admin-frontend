import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { ModalProvider } from 'styled-react-modal';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import NewPlacePage from './pages/NewPlacePage';
import PlaceDetailPage from './pages/PlaceDetailPage';
import PlacesPage from './pages/PlacesPage';
import UserReviewDetailPage from './pages/UserReviewDetailPage';
import UserReviewsPage from './pages/UserReviewsPage';
import GlobalStyle from './styles/GlobalStyle';
import UsersPage from './pages/UsersPage';
import UserDetailPage from './pages/UserDetailPage';
import SignUpPage from './pages/SignUpPage';
import WelcomePage from './pages/WelcomePage';
import Header from './components/Header';
import { adminApiService } from './services/AdminApiService';
import { userReviewApiService } from './services/UserReviewApiService';

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    adminApiService.setAccessToken(accessToken);
    userReviewApiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <div>
      <Reset />
      <GlobalStyle />
      {accessToken && (
        <Header />
      )}
      <ModalProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="/welcome" element={<WelcomePage />} />
          <Route path="/places" element={<PlacesPage />} />
          <Route path="/places/:id" element={<PlaceDetailPage />} />
          <Route path="/places/new" element={<NewPlacePage />} />
          <Route path="/reviews" element={<UserReviewsPage />} />
          <Route path="/reviews/:id" element={<UserReviewDetailPage />} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/users/:id" element={<UserDetailPage />} />
        </Routes>
      </ModalProvider>
    </div>
  );
}
