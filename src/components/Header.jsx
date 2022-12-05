/* eslint-disable no-nested-ternary */
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import styled from 'styled-components';
import { useState } from 'react';
import useUserStore from '../hooks/useUserStore';
import useAdminStore from '../hooks/useAdminStore';

const Container = styled.header`
  width: 100%;
  position: fixed;
  z-index: 100;
  background-color: #FFF;
  border-bottom: 1px solid #EEE;
`;

const Wrapper = styled.div`
  padding-inline: calc((100% - 400px) / 2);
  vertical-align: middle;
`;

const Navigation = styled.nav`
    left: 0;
    right: 0;
    bottom: 0;
    height: 4em;
`;

const List = styled.ul`
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
`;

const MyMenu = styled.button`
  font-size: 1em;
  background: none;
  border: none;
`;

const Trial = styled.button`
  font-size: 1em;
  color: #FFF;
  background-color: #4135bb;
  border: none;
  border-radius: 4px;
  padding: .5em;
`;

const Login = styled.button`
  font-size: 1em;
  color: #ff9d13;
  background: none;
  border: none;
`;

const Logout = styled.button`
  font-size: 1em;
  background: none;
  border: none;
`;

export default function Header() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const navigate = useNavigate();
  const adminStore = useAdminStore();

  const handleLogoutClick = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <Container>
      <Wrapper>
        <Navigation>
          <List>
            <li>
              <Link to="/places">장소 관리</Link>
            </li>
            <li>
              <Link to="/users">회원 관리</Link>
            </li>
            <li>
              <Link to="/reviews">리뷰 관리</Link>
            </li>
            {accessToken && (
              <li>
                <Logout type="button" onClick={handleLogoutClick}>로그아웃</Logout>
              </li>
            )}
          </List>
        </Navigation>
      </Wrapper>
    </Container>
  );
}
