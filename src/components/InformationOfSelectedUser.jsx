import styled from 'styled-components';

const Title = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  margin-block: 1em;
`;

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-bottom: 3em;
`;

const UserId = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const Nickname = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-top: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

const Email = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-block: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }
`;

const SocialLoginId = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-bottom: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  p:last-child {
    color: #6c6c6c;
  }  
`;

const AuthBy = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-block: 1.2em;
  border-bottom: 1px solid #EEE;

  p:first-child {
    font-weight: bold;
  }

  span {
    color: #6c6c6c;
  }
`;

export default function InformationOfSelectedUser({ user, deleteUser }) {
  const handleDeleteUserClick = (userId) => {
    deleteUser(userId);
  };

  return (
    <div>
      {Object.keys(user) ? (
        <>
          <Title>기본정보</Title>
          <Wrapper>
            <UserId>
              <p>사용자 고유번호</p>
              <p>{user.id}</p>
            </UserId>
            <Nickname>
              <p>닉네임</p>
              <span>{user.nickname}</span>
            </Nickname>
            <Email>
              <p>이메일</p>
              <p>{user.email}</p>
            </Email>
            <SocialLoginId>
              <p>소셜 로그인 아이디</p>
              <p>{user.socialLoginId}</p>
            </SocialLoginId>
            <AuthBy>
              <p>인증 방식</p>
              <p>{user.authBy}</p>
            </AuthBy>
            <AuthBy>
              <p>가입 상태</p>
              <p>{user.state}</p>
            </AuthBy>
            <button type="button" onClick={() => handleDeleteUserClick(user.id)}>회원 삭제</button>
          </Wrapper>
        </>
      ) : (
        <p>now loading...</p>
      )}
    </div>
  );
}
