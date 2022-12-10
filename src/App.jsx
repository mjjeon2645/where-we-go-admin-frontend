import { Route, Routes } from 'react-router-dom';
import { Reset } from 'styled-reset';
import { ModalProvider } from 'styled-react-modal';
import { useLocalStorage } from 'usehooks-ts';
import { useEffect } from 'react';
import styled from 'styled-components';
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
import SideMenu from './components/SideMenu';
import { adminApiService } from './services/AdminApiService';
import { userReviewApiService } from './services/UserReviewApiService';
import AuthenticationErrorPage from './pages/AuthenticationErrorPage';
import { placeApiService } from './services/PlaceApiService';
import { userApiService } from './services/UserApiService';

const Container = styled.div`
max-width: 1440px;
min-width: 1080px;
min-height: 100vh;
margin: 0 auto;
`;

const Menu = styled.div`
  background: #1D5C84;
  position: fixed;
  top: 0;
  left: 0;
  width: 216px;
  height: 100%;
  padding: 50px 0;
  transition: all 0.5s ease;
`;

const Content = styled.div`
  display: inline-block;
  width: 1080px;
  padding-left: 230px;
  height: 100%;
`;

export default function App() {
  const [accessToken] = useLocalStorage('accessToken', '');

  useEffect(() => {
    adminApiService.setAccessToken(accessToken);
    userReviewApiService.setAccessToken(accessToken);
    userApiService.setAccessToken(accessToken);
    placeApiService.setAccessToken(accessToken);
  }, [accessToken]);

  return (
    <Container>
      <Reset />
      <GlobalStyle />
      {accessToken && (
        <Menu>
          <SideMenu />
        </Menu>
      )}
      <Content>
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
            <Route path="auth-error" element={<AuthenticationErrorPage />} />
          </Routes>
        </ModalProvider>
      </Content>
    </Container>
  );
}
