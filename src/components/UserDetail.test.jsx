import { render, screen } from '@testing-library/react';

import UserDetail from './UserDetail';

const context = describe;

let user;
let userChildren;
let bookmarks;
let userReviewsFoundByUserId;

const deleteSelectedUser = jest.fn();

describe('UserDetail', () => {
  function renderUserDetail() {
    render(<UserDetail
      user={user}
      userChildren={userChildren}
      bookmarks={bookmarks}
      userReviews={userReviewsFoundByUserId}
      deleteSelectedUser={deleteSelectedUser}
    />);
  }

  // TODO. 하단 컴포넌트들 테스트 모두 통과 시 해당 컴포넌트는 ui만 확인해주면 됨
  context('a manager accesses user detail page', () => {
    user = {};
    it('renders user detail', () => {
      renderUserDetail();
    });
  });

  context('there is no user information', () => {
    beforeEach(() => {
      user = {};
    });
    it('renders warning message', () => {
      renderUserDetail();

      screen.getByText('now loading...');
    });
  });
});
