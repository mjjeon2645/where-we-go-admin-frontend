import styled from 'styled-components';
import { dateFormatter } from '../utils/dateFormatter';
import { signUpStateFormatter } from '../utils/signUpStateFormatter';

const Wrapper = styled.article`
  padding-inline: 1em;
  margin-top: 4em;
  margin-bottom: 3em;
`;

const Section = styled.section`
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

const LastSection = styled.section`
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

export default function InformationOfSelectedUser({ user, toggleModal }) {
  const handleDeleteModalOpenClick = () => {
    toggleModal();
  };

  return (
    <div>
      {Object.keys(user).length !== 0 ? (
        <Wrapper>
          <Section>
            <p>사용자 고유번호</p>
            <p>{user.id}</p>
          </Section>
          <Section>
            <p>닉네임</p>
            <p>{user.nickname}</p>
          </Section>
          <Section>
            <p>이메일</p>
            <p>{user.email}</p>
          </Section>
          <Section>
            <p>소셜 로그인 아이디</p>
            <p>{user.socialLoginId}</p>
          </Section>
          <Section>
            <p>회원가입 일자</p>
            <p>{dateFormatter(user.createdAt)}</p>
          </Section>
          <Section>
            <p>인증 방식</p>
            <p>{user.authBy}</p>
          </Section>
          <LastSection>
            <p>가입 상태</p>
            <p>{signUpStateFormatter(user.state)}</p>
          </LastSection>
          <DeleteButton>
            <button type="button" onClick={handleDeleteModalOpenClick}>회원 삭제</button>
          </DeleteButton>
        </Wrapper>
      ) : (
        <p>now loading...</p>
      )}
    </div>
  );
}
