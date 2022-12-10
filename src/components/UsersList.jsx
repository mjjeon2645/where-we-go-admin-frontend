import styled from 'styled-components';

import { dateFormatter } from '../utils/dateFormatter';

const Total = styled.div`
  text-align: right;
  margin-top: 3em;
  margin-bottom: .5em;

  strong {
    color: #ff6416;
  }
`;

const Table = styled.table`
  text-align: center;
  width: 100%;

  th {
    font-size: .8em;
    font-weight: bold;
    padding-block: 1em;
    background-color: #EEE;
  }

  td {
    font-size: .8em;
    padding-block: 1em;
    padding-inline: .2em;
  }

  button {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #DDD;
  }
`;

const Number = styled.th`
  width: 5%;
`;

const Identifier = styled.th`
  width: 10%;
`;

const Nickname = styled.th`
  width: 20%;
`;

const Email = styled.th`
  width: 25%;
`;

const CreatedAt = styled.th`
  width: 30%;
`;

const AuthBy = styled.th`
  width: 10%;
`;

const NoUsers = styled.p`
  margin-top: 3em;
`;

export default function UsersList({ users, goUserDetailPage }) {
  const handleUserDetailClick = (userId) => {
    goUserDetailPage(userId);
  };

  return (
    <article>
      {users.length ? (
        <div>
          <Total>
            총
            {' '}
            <strong>{users.length}</strong>
            명
          </Total>
          <Table>
            <thead>
              <tr>
                <Number>No.</Number>
                <Identifier>고유번호</Identifier>
                <Nickname>닉네임</Nickname>
                <Email>이메일</Email>
                <CreatedAt>회원가입 일자</CreatedAt>
                <AuthBy>인증 주체</AuthBy>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => (
                <tr key={user.id}>
                  <td>{users.length - index}</td>
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
                  <td>{dateFormatter(user.createdAt)}</td>
                  <td>{user.authBy}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      ) : (
        <NoUsers>등록된 유저가 없습니다.</NoUsers>
      )}
    </article>
  );
}
