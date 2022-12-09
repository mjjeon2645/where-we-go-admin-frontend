import {
  fireEvent, render, screen, waitFor,
} from '@testing-library/react';

import SignUpForm from './SignUpForm';

const context = describe;

const submit = jest.fn();
const goPrevPage = jest.fn();
const uploadProfileImage = jest.fn();

let isAdminAlreadyExist;
let isAdminIdDuplicated;
let errorMessage;
let profileImageUrl;

describe('SignUpForm', () => {
  function renderSignUpForm() {
    render(<SignUpForm
      submit={submit}
      isAdminAlreadyExist={isAdminAlreadyExist}
      isAdminIdDuplicated={isAdminIdDuplicated}
      errorMessage={errorMessage}
      goPrevPage={goPrevPage}
      uploadProfileImage={uploadProfileImage}
      profileImageUrl={profileImageUrl}
    />);
  }

  context('a manager accesses signup page', () => {
    beforeEach(() => {
      isAdminAlreadyExist = '';
      isAdminIdDuplicated = '';
      errorMessage = '';
      profileImageUrl = 'profileImage';
    });

    it('show error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '전민지' },
      });

      fireEvent.change(screen.getByLabelText('사번 :'), {
        target: { value: 1255 },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: 'angel2635' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: 'alswlfnd123!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: 'alswlfnd123!' },
      });

      // TODO. input에 파일 체인지 하는 법 확인해야 함
      // const file = new File(['hello'], 'hello.png', { type: 'image/png' });

      // await waitFor(() => {
      //   fireEvent.change(screen.getByLabelText('프로필 이미지'), {
      //     target: { files: [file] },
      //   });
      // });

      // expect(uploadProfileImage).toBeCalled();

      // fireEvent.click(screen.getByText('어드민 계정 생성하기'));

      // await waitFor(() => {
      //   expect(submit).toBeCalled();
      // });
    });
  });

  context('a manager accesses signup page and set no information and submit', () => {
    beforeEach(() => {
      isAdminAlreadyExist = '';
      isAdminIdDuplicated = '';
      errorMessage = '';
      profileImageUrl = 'profileImage';
    });

    it('show error message', async () => {
      renderSignUpForm();

      fireEvent.change(screen.getByLabelText('이름 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('사번 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('아이디 :'), {
        target: { value: '' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 :'), {
        target: { value: '!' },
      });

      fireEvent.change(screen.getByLabelText('비밀번호 확인 :'), {
        target: { value: '!' },
      });

      fireEvent.click(screen.getByText('어드민 계정 생성하기'));

      await waitFor(() => {
        screen.getByText('이름을 입력해주세요');
        screen.getByText('사번 4자리를 입력해주세요');
        screen.getByText('아이디를 입력해주세요');
        screen.getByText('비밀번호를 다시 확인해주세요');
        screen.getByText('프로필 이미지를 업로드 해주세요');
      });
    });
  });
});
