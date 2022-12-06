import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import DeleteReviewModal from '../components/DeleteReviewModal';
import UserReviewDetail from '../components/UserReviewDetail';
import useUserReviewStore from '../hooks/useUserReviewStore';
import useAdminStore from '../hooks/useAdminStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
`;

export default function UserReviewDetailPage() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const userReviewStore = useUserReviewStore();
  const adminStore = useAdminStore();
  const { userReview, errorMessage } = userReviewStore;
  const { adminId, employeeIdentificationNumber } = adminStore;
  const id = document.location.pathname.split('/')[2];

  useEffect(() => {
    userReviewStore.fetchSelectedReview(id);
    adminStore.fetchAdmin();
  }, []);

  const toggleModal = () => {
    userReviewStore.clearDeleteState();
    setIsOpen(!isOpen);
  };

  const deleteReview = async () => {
    const data = await userReviewStore.deleteReview(id);

    if (!data) {
      return;
    }

    userReviewStore.clearDeleteState();
    setIsOpen(!isOpen);
    navigate('/reviews');
  };

  const goToPrevPage = () => {
    navigate(-1);
  };

  const setDeleteReason = (text) => {
    userReviewStore.setDeleteReason(text);
  };

  const setAdminPassword = (text) => {
    userReviewStore.setAdminPassword(text);
  };

  return (
    <Container>
      <Title>
        리뷰 관리
        {' '}
        {'>'}
        {' '}
        상세 정보
      </Title>
      <UserReviewDetail
        userReview={userReview}
        toggleModal={toggleModal}
        goToPrevPage={goToPrevPage}
      />
      <DeleteReviewModal
        isOpen={isOpen}
        toggleModal={toggleModal}
        deleteReview={deleteReview}
        setDeleteReason={setDeleteReason}
        adminId={adminId}
        employeeIdentificationNumber={employeeIdentificationNumber}
        setAdminPassword={setAdminPassword}
        errorMessage={errorMessage}
      />
    </Container>
  );
}
