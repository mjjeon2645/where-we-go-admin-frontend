/* eslint-disable no-nested-ternary */
import { useEffect } from 'react';

import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useLocalStorage } from 'usehooks-ts';

import useAdminStore from '../hooks/useAdminStore';

import { adminApiService } from '../services/AdminApiService';

const ProfileSection = styled.div`
  margin-bottom: 30px;
  text-align: center;
`;

const ProfileImage = styled.img`
  display: block;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin: 0 auto;
`;

const Name = styled.h3`
  font-size: 1.2em;
  color: #FFF;
  font-weight: bold;
  margin: 20px 0 5px;
`;

const EmployeeNumber = styled.p`
   font-size: .8em;
   color: #FFF;
`;

const List = styled.ul`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    li {
      margin-block: 2em;
    }

    a {
      color: #FFF;
      display: block;
      padding: 13px 30px;
      border-bottom: 1px solid #b8bbbd;
      color: rgb(241, 237, 237);
      font-size: 16px;
      position: relative;
    }

    a:hover, a:active {
      color: #0c7db1;

      background:white;
      border-right: 2px solid #054468;
    }

    button {
      color: #FFF;
    }
`;

const Logout = styled.button`
  font-size: 1em;
  background: none;
  border: none;
`;

export default function SideMenu() {
  const [accessToken, setAccessToken] = useLocalStorage('accessToken', '');

  const adminStore = useAdminStore();

  const { admin } = adminStore;

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      adminApiService.setAccessToken(accessToken);
      adminStore.fetchAdmin();
    }
  }, [accessToken]);

  const handleLogoutClick = () => {
    setAccessToken('');
    navigate('/');
  };

  return (
    <div>
      {Object.keys(admin).length !== 0 ? (
        <div>
          <ProfileSection>
            <ProfileImage src={admin.profileImage} alt="" />
            <Name>{admin.name}</Name>
            <EmployeeNumber>
              사원번호:
              {' '}
              {admin.employeeIdentificationNumber}
            </EmployeeNumber>
          </ProfileSection>
          <nav>
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
          </nav>
        </div>
      ) : (
        <p>now loading...</p>
      )}
    </div>
  );
}
