import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DeleteReviewModal from '../components/DeleteReviewModal';
import UserReviewDetail from '../components/UserReviewDetail';
import useUserReviewStore from '../hooks/useUserReviewStore';

export default function UserReviewDetailPage() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
  };

  const userReviewStore = useUserReviewStore();

  const navigate = useNavigate();

  const { userReview } = userReviewStore;

  const id = document.location.pathname.split('/')[2];

  useEffect(() => {
    userReviewStore.fetchSelectedReview(id);
  }, []);

  const deleteReview = async () => {
    await userReviewStore.deleteReview(id);
    navigate('/reviews');
  };

  const goToPrevPage = () => {
    navigate(-1);
  };

  const setDeleteReason = (text) => {
    userReviewStore.setDeleteReason(text);
  };

  return (
    <div>
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
      />
    </div>
  );
}
