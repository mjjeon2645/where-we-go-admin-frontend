import { useEffect } from 'react';
import UserReviewsList from '../components/UserReviewsList';
import useUserStore from '../hooks/useUserStore';

export default function UserReviewsPage() {
  const userStore = useUserStore();

  const { allUserReviews } = userStore;

  useEffect(() => {
    userStore.fetchAllUserReviews();
  }, []);

  return (
    <div>
      <UserReviewsList allUserReviews={allUserReviews} />
    </div>
  );
}
