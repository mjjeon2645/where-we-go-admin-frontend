import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import UsersList from '../components/UsersList';
import useUserStore from '../hooks/useUserStore';

export default function UsersPage() {
  const navigate = useNavigate();

  const userStore = useUserStore();

  const { users } = userStore;

  useEffect(() => {
    userStore.fetchAllUsers();
  }, []);

  const goUserDetailPage = (id) => {
    navigate(`/users/${id}`);
  };

  return (
    <div>
      <UsersList
        users={users}
        goUserDetailPage={goUserDetailPage}
      />
    </div>
  );
}
