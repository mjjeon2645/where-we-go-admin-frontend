import styled from 'styled-components';
import BookmarksListOfSelectedUser from './BookmarksListOfSelectedUser';
import ChildrenListOfSelectedUser from './ChildrenListOfSelectedUser';
import InformationOfSelectedUser from './InformationOfSelectedUser';
import UserReviewsListOfSelectedUser from './UserReviewsListOfSelectedUser';

const Container = styled.div`
    padding: 3em;
`;

export default function UserDetail({
  user, userChildren, bookmarks, userReviews, deleteSelectedUser,
}) {
  const deleteUser = (userId) => {
    deleteSelectedUser(userId);
  };
  return (
    <Container>
      {Object.keys(user).length ? (
        <div>
          <p>회원정보 상세</p>
          <InformationOfSelectedUser user={user} deleteUser={deleteUser} />
          <ChildrenListOfSelectedUser userChildren={userChildren} />
          <UserReviewsListOfSelectedUser userReviews={userReviews} />
          <BookmarksListOfSelectedUser bookmarks={bookmarks} />
        </div>
      ) : (
        <div>now loading...</div>
      )}
    </Container>
  );
}
