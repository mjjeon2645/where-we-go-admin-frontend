import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UserDetail from '../components/UserDetail';
import useUserStore from '../hooks/useUserStore';
import useUserReviewStore from '../hooks/useUserReviewStore';

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
    <div>
      <UserDetail
        user={user}
        userChildren={userChildren}
        bookmarks={bookmarks}
        userReviews={userReviewsFoundByUserId}
        deleteSelectedUser={deleteSelectedUser}
      />
    </div>
  );
}
