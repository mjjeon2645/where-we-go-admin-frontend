import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';
import { signUpStateFormatter } from '../utils/signUpStateFormatter';

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-top: 4em;
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

  p:last-child {
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

  p:last-child {
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

const CreatedAt = styled.section`
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

  p:last-child {
    color: #6c6c6c;
  }
`;

const DeleteButton = styled.div`
  text-align: right;
  margin-block: 1em;

  button {
    font-weight: bold;
    color: #FFF;
    background: #054468;
    border: none;
    border-radius: 8px;
    padding: 1em 2em;
  }
`;

export default function InformationOfSelectedUser({ user, deleteUser }) {
  const handleDeleteUserClick = (userId) => {
    deleteUser(userId);
  };

  return (
    <div>
      {Object.keys(user) ? (
        <Wrapper>
          <UserId>
            <p>사용자 고유번호</p>
            <p>{user.id}</p>
          </UserId>
          <Nickname>
            <p>닉네임</p>
            <p>{user.nickname}</p>
          </Nickname>
          <Email>
            <p>이메일</p>
            <p>{user.email}</p>
          </Email>
          <SocialLoginId>
            <p>소셜 로그인 아이디</p>
            <p>{user.socialLoginId}</p>
          </SocialLoginId>
          <CreatedAt>
            <p>회원가입 일자</p>
            <p>{dateFormatter(user.createdAt)}</p>
          </CreatedAt>
          <AuthBy>
            <p>인증 방식</p>
            <p>{user.authBy}</p>
          </AuthBy>
          <AuthBy>
            <p>가입 상태</p>
            <p>{signUpStateFormatter(user.state)}</p>
          </AuthBy>
          <DeleteButton>
            <button type="button" onClick={() => handleDeleteUserClick(user.id)}>회원 삭제</button>
          </DeleteButton>
        </Wrapper>
      ) : (
        <p>now loading...</p>
      )}
    </div>
  );
}
