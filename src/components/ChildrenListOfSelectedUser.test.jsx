import { render, screen } from '@testing-library/react';

import ChildrenListOfSelectedUser from './ChildrenListOfSelectedUser';

const context = describe;

let userChildren;

describe('ChildrenListOfSelectedUser', () => {
  function renderChildrenListOfSelectedUser() {
    render(<ChildrenListOfSelectedUser userChildren={userChildren} />);
  }

  context('아이 정보가 없을 때', () => {
    beforeEach(() => {
      userChildren = [];
    });

    it('renders the page with a no children information message', () => {
      renderChildrenListOfSelectedUser();

      screen.getByText('등록된 아이 정보가 없습니다.');
    });
  });

  context('아이 정보가 있을 때', () => {
    beforeEach(() => {
      userChildren = [
        { id: 1, gender: '공주님', birthday: '2021-01-03' },
        { id: 2, gender: '아직 몰라요', birthday: '2023-01-03' },
      ];
    });

    it('renders the page with a no children information message', () => {
      renderChildrenListOfSelectedUser();

      screen.getByText('아이정보');
      screen.getByText('아이정보 고유번호');
      screen.getByText('성별');
      screen.getByText('생일');
      screen.getByText('공주님');
      screen.getByText('아직 몰라요');
      screen.getByText('2021-01-03');
    });
  });
});
