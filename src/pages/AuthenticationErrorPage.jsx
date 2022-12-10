import { useNavigate } from 'react-router-dom';

import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  text-align: center;
  padding-inline: calc((100% - 400px) / 2);
  margin-top: 10em;
`;

const Title = styled.h2`
  font-size: 2em;
  color: #1D5C84;
  font-weight: bold;
  border-bottom: 1px solid #1D5C84;
  margin-bottom: 1.5em;
  padding-bottom: .3em;
`;

const LoginButton = styled.button`
  border: none;
  border-radius: 4px;
  width: 100%;
  padding: 1.2em 2.8em;
  margin-top: 3em;
`;

export default function AuthenticationErrorPage() {
  const navigate = useNavigate();

  const handleGoToLoginClick = () => {
    navigate('/');
  };

  return (
    <Wrapper>
      <Title>Authentication Error</Title>
      <p>접근 권한이 없습니다. 로그인 후 이용해주세요.</p>
      <LoginButton
        type="button"
        onClick={handleGoToLoginClick}
      >
        로그인 페이지로 이동하기
      </LoginButton>
    </Wrapper>
  );
}
