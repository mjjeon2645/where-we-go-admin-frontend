import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import UserReviewsList from '../components/UserReviewsList';

import useUserReviewStore from '../hooks/useUserReviewStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
`;

export default function UserReviewsPage() {
  const navigate = useNavigate();

  const userReviewStore = useUserReviewStore();

  const { allUserReviews } = userReviewStore;

  useEffect(() => {
    userReviewStore.fetchAllUserReviews();
  }, []);

  const selectedUserDetailPage = (id) => {
    navigate(`/users/${id}`);
  };

  const selectedReviewDetailPage = (id) => {
    navigate(`/reviews/${id}`);
  };

  const selectedPlaceDetailPage = (id) => {
    navigate(`/places/${id}`);
  };

  return (
    <Container>
      <Title>
        리뷰 관리
        {' '}
        {'>'}
        {' '}
        전체
      </Title>
      <UserReviewsList
        allUserReviews={allUserReviews}
        selectedUserDetailPage={selectedUserDetailPage}
        selectedReviewDetailPage={selectedReviewDetailPage}
        selectedPlaceDetailPage={selectedPlaceDetailPage}
      />
    </Container>
  );
}
