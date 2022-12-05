import styled from 'styled-components';

const Container = styled.div`
  padding: 5em;
`;

const Table = styled.table`
  text-align: center;
`;

const Number = styled.th`
  width: 5%;
`;

const SelectBox = styled.th`
  width: 5%;
`;

const Identifier = styled.th`
  width: 5%;
`;

const Nickname = styled.th`
  width: 20%;
`;

const Email = styled.th`
  width: 25%;
`;

const SocialLoginId = styled.th`
  width: 30%;
`;

const AuthBy = styled.th`
  width: 10%;
`;

export default function UsersList({ users, goUserDetailPage }) {
  const handleUserDetailClick = (userId) => {
    goUserDetailPage(userId);
  };

  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <Number>No.</Number>
            <SelectBox>선택</SelectBox>
            <Identifier>고유번호</Identifier>
            <Nickname>닉네임</Nickname>
            <Email>이메일</Email>
            <SocialLoginId>소셜 로그인 ID</SocialLoginId>
            <AuthBy>인증 주체</AuthBy>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{users.length - index}</td>
              <td><input type="checkbox" /></td>
              <td>{user.id}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleUserDetailClick(user.id)}
                >
                  {user.nickname}
                </button>
              </td>
              <td>{user.email}</td>
              <td>{user.socialLoginId}</td>
              <td>{user.authBy}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
