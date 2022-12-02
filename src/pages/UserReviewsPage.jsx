import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserReviewsList from '../components/UserReviewsList';
import useUserReviewStore from '../hooks/useUserReviewStore';

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
    <div>
      <UserReviewsList
        allUserReviews={allUserReviews}
        selectedUserDetailPage={selectedUserDetailPage}
        selectedReviewDetailPage={selectedReviewDetailPage}
        selectedPlaceDetailPage={selectedPlaceDetailPage}
      />
    </div>
  );
}
