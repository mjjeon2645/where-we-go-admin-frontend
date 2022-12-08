import { render, screen } from '@testing-library/react';

import BookmarksListOfSelectedUser from './BookmarksListOfSelectedUser';

const context = describe;

let bookmarks;

describe('BookmarksListOfSelectedUser', () => {
  function renderBookmarksListOfSelectedUser() {
    render(<BookmarksListOfSelectedUser bookmarks={bookmarks} />);
  }

  context('북마크가 없을 때', () => {
    beforeEach(() => {
      bookmarks = [];
    });

    it('renders the detail page with a message of no bookmarks', () => {
      renderBookmarksListOfSelectedUser();

      screen.getByText('즐겨찾기 목록이 없습니다.');
    });
  });

  context('북마크가 있을 때', () => {
    beforeEach(() => {
      bookmarks = [
        { placeId: 1, name: '민지네', address: '서울시 종로구' },
        { placeId: 2, name: '고래네', address: '경기도 광주시' },
        { placeId: 3, name: '콜라네', address: '강원도 원주시' },
      ];
    });

    it('renders the detail page with selected user bookmarks list', () => {
      renderBookmarksListOfSelectedUser();

      screen.getByText('민지네');
      screen.getByText('서울시 종로구');
      screen.getByText('고래네');
      screen.getByText('강원도 원주시');
    });
  });
});
