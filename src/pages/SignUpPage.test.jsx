// TODO. 파일 업로드 관련 테스트 찾아봐야 함

import { render } from '@testing-library/react';
import SignUpPage from './SignUpPage';

const context = describe;

const navigate = jest.fn();

jest.mock('react-router-dom', () => ({
  useNavigate: () => navigate,
}));

let isAdminAlreadyExist;
let isAdminIdDuplicated;
let errorMessage;
let profileImageUrl;

const uploadProfileImage = jest.fn();
const adminSignUp = jest.fn();

jest.mock('../hooks/useAdminStore', () => () => ({
  isAdminAlreadyExist,
  isAdminIdDuplicated,
  errorMessage,
  profileImageUrl,
  uploadProfileImage,
  adminSignUp,
}));

describe('SignUpPage', () => {
  function renderSignUpPage() {
    render(<SignUpPage />);
  }

  context('a manager clicks to init a new admin account', () => {
    it('renders sign up form', () => {
      renderSignUpPage();
    });
  });
});
