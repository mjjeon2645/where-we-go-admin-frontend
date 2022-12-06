import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import UserDetail from '../components/UserDetail';
import useUserStore from '../hooks/useUserStore';
import useUserReviewStore from '../hooks/useUserReviewStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
`;

export default function UserDetailPage() {
  const userStore = useUserStore();
  const userReviewStore = useUserReviewStore();
  const navigate = useNavigate();

  const { user, children: userChildren, bookmarks } = userStore;
  const { userReviewsFoundByUserId } = userReviewStore;
  const id = document.location.pathname.split('/')[2];

  useEffect(() => {
    userStore.fetchSelectedUser(id);
    userReviewStore.fetchAllReviewsByUserId(id);
  }, []);

  const deleteSelectedUser = async (userId) => {
    await userStore.deleteSelectedUser(userId);
    navigate('/users');
  };

  return (
    <Container>
      <Title>
        회원 관리
        {' '}
        {'>'}
        {' '}
        상세 정보
      </Title>
      <UserDetail
        user={user}
        userChildren={userChildren}
        bookmarks={bookmarks}
        userReviews={userReviewsFoundByUserId}
        deleteSelectedUser={deleteSelectedUser}
      />
    </Container>
  );
}
