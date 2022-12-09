import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import UsersList from '../components/UsersList';

import useUserStore from '../hooks/useUserStore';

const Container = styled.div`
  padding: 5em 2em;
`;

const Title = styled.h2`
  font-size: 1.8em;
  font-weight: bold;
`;

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
    <Container>
      <Title>
        회원 관리
        {' '}
        {'>'}
        {' '}
        전체
      </Title>
      <UsersList
        users={users}
        goUserDetailPage={goUserDetailPage}
      />
    </Container>
  );
}
